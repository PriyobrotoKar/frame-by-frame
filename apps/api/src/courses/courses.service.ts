import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create.course';
import { slugify } from '@/common/utils';
import {
  DailyAnalytics,
  db,
  MonthlyAnalytics,
  VideoStatus,
} from '@frame-by-frame/db';
import { UpdateChapterDto } from './dto/update.chapter';
import { CreateDocumentDto } from './dto/create.document';
import { UpdateDocumentDto } from './dto/update.document';
import { CreateAttachmentDto } from './dto/create.attachment';
import { CreateVideoDto } from './dto/create.video';
import { UpdateVideoDto } from './dto/update.video';
import { UpdateCourseDto } from './dto/update.course';
import { CreateLearningDto } from './dto/create.learning';
import { UpdateLeaningDto } from './dto/update.learning';
import { CreateInstructorDto } from './dto/create.instructor';
import { UpdateInstructorDto } from './dto/update.instructor';
import { JwtPayload } from '@/types/jwt.payload';
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  max,
  subMonths,
} from 'date-fns';

@Injectable()
export class CoursesService {
  constructor() {}

  async createCourse(dto: CreateCourseDto) {
    const slug = slugify(dto.title);

    // check if course with the same slug already exists
    const existingCourse = await this.findCourseBySlug(slug, true);

    if (existingCourse) {
      throw new BadRequestException('Course with this name already exists');
    }

    // create new course
    const course = await db.course.create({
      data: {
        versions: {
          create: {
            title: dto.title,
            slug,
          },
        },
      },
      include: {
        versions: {
          select: {
            id: true,
            title: true,
            slug: true,
            isPublished: true,
          },
        },
      },
    });

    const courseVersion = course.versions[0];

    return {
      ...course,
      ...courseVersion,
    };
  }

  async getCourses(isAdmin = false) {
    const courses = await db.course.findMany({
      include: {
        versions: {
          include: {
            chapters: {
              include: {
                videos: {
                  select: {
                    id: true,
                    title: true,
                    order: true,
                  },
                },
                documents: {
                  select: {
                    id: true,
                    title: true,
                    order: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Map through courses to ensure the structure is consistent
    const courseDetails = courses.map((course) => {
      const version = course.versions.find((v) => v.isPublished === !isAdmin);
      if (!version) {
        return null;
      }

      version.chapters = version.chapters.map((chapter) => {
        const chapterWithLesson = {
          ...chapter,
          lessons: [
            ...chapter.documents.map((doc) => ({ ...doc, type: 'document' })),
            ...chapter.videos.map((video) => ({ ...video, type: 'video' })),
          ].sort((a, b) => a.order - b.order),
        };

        delete chapterWithLesson.videos;
        delete chapterWithLesson.documents;

        return chapterWithLesson;
      });

      delete course.versions;

      return {
        ...course,
        ...version,
      };
    });

    // Filter out any null entries
    return courseDetails.filter((course) => course !== null);
  }

  async getCourseBySlug(slug: string, isAdmin = false) {
    const course = await this.findCourseBySlug(slug, isAdmin);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    course.chapters = course.chapters.map((chapter) => {
      const chapterWithLesson = {
        ...chapter,
        lessons: [
          ...chapter.documents.map((doc) => ({ ...doc, type: 'document' })),
          ...chapter.videos.map((video) => ({ ...video, type: 'video' })),
        ].sort((a, b) => a.order - b.order),
      };

      delete chapterWithLesson.videos;
      delete chapterWithLesson.documents;

      return chapterWithLesson;
    });

    return course;
  }

  private async findCourseBySlug(slug: string, isAdmin = false) {
    const course = await db.courseVersion.findFirst({
      where: {
        slug,
        isPublished: !isAdmin,
      },
      include: {
        trailer: true,
        instructors: true,
        learnings: true,
        chapters: {
          include: {
            videos: {
              select: {
                id: true,
                title: true,
                order: true,
              },
            },
            documents: {
              select: {
                id: true,
                title: true,
                order: true,
              },
            },
          },
        },
        _count: {
          select: {
            chapters: true,
          },
        },
      },
    });

    return course;
  }

  async updateCourse(slug: string, dto: UpdateCourseDto) {
    const course = await this.findCourseBySlug(slug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    if (dto.title !== course.title) {
      const existingCourse = await db.courseVersion.findFirst({
        where: {
          slug: slugify(dto.title),
        },
      });

      if (existingCourse && existingCourse.id !== course.id) {
        throw new BadRequestException('Course with this name already exists');
      }
    }

    const updatedCourse = await db.courseVersion.update({
      where: {
        id: course.id,
      },
      data: {
        ...dto,
        price: dto.price * 100,
      },
    });

    return updatedCourse;
  }

  async addTrailer(slug: string) {
    const course = await db.courseVersion.findFirst({
      where: {
        slug,
        isPublished: false,
      },
    });

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const videoSlug = slugify(`trailer for ${course.title}`);

    // Add a placeholder trailer URL
    const video = await db.video.create({
      data: {
        title: `Trailer for ${course.title}`,
        slug: videoSlug,
        order: 0,
        course: {
          connect: {
            id: course.id,
          },
        },
      },
    });

    return video;
  }

  async publishCourse(slug: string) {
    const course = await db.courseVersion.findFirst({
      where: {
        slug,
        isPublished: false,
      },
      include: {
        _count: {
          select: {
            chapters: true,
          },
        },
        chapters: {
          include: {
            videos: {
              include: {
                attachments: true,
              },
            },
            documents: {
              include: {
                attachments: true,
              },
            },
          },
        },
        learnings: true,
        instructors: true,
        trailer: {
          include: {
            attachments: true,
          },
        },
      },
    });

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    // Check if the course has chapters
    if (course._count.chapters === 0) {
      throw new BadRequestException('Course must have at least one chapter');
    }

    // check if the course's price is set
    if (course.price === 0) {
      throw new BadRequestException(
        'Course price must be set before publishing',
      );
    }

    // check if there is already a published version of the course
    const existingPublishedCourse = await db.courseVersion.findFirst({
      where: {
        courseId: course.courseId,
        isPublished: true,
      },
    });

    delete course.id;
    delete course._count;

    // if there is, we need to update it or create a new version
    let publisedCourse;

    if (existingPublishedCourse) {
      await db.chapter.deleteMany({
        where: {
          courseVersionId: existingPublishedCourse.id,
        },
      });

      await db.courseLearnings.deleteMany({
        where: {
          courseVersionId: existingPublishedCourse.id,
        },
      });

      await db.instructor.deleteMany({
        where: {
          courseVersionId: existingPublishedCourse.id,
        },
      });

      publisedCourse = await db.courseVersion.update({
        where: {
          id: existingPublishedCourse.id,
        },
        data: {
          title: course.title,
          slug: course.slug,
          subtitle: course.subtitle,
          image: course.image,
          description: course.description,
          price: course.price,
          chapters: {
            create: course.chapters.map((chapter) => ({
              title: chapter.title,
              slug: chapter.slug,
              order: chapter.order,
              videos: {
                create: chapter.videos.map((video) => ({
                  title: video.title,
                  slug: video.slug,
                  description: video.description,
                  order: video.order,
                  url: video.url,
                  status: video.status,
                  attachments: {
                    create: video.attachments.map((attachment) => ({
                      name: attachment.name,
                      url: attachment.url,
                      type: attachment.type,
                      size: attachment.size,
                    })),
                  },
                })),
              },
              documents: {
                create: chapter.documents.map((document) => ({
                  title: document.title,
                  slug: document.slug,
                  order: document.order,
                  attachments: {
                    create: document.attachments.map((attachment) => ({
                      name: attachment.name,
                      url: attachment.url,
                      type: attachment.type,
                      size: attachment.size,
                    })),
                  },
                })),
              },
            })),
          },
          learnings: {
            create: course.learnings.map((learning) => ({
              title: learning.title,
              description: learning.description,
            })),
          },
          instructors: {
            create: course.instructors.map((instructor) => ({
              name: instructor.name,
              specialization: instructor.specialization,
              experienceYears: instructor.experienceYears,
              followers: instructor.followers,
              revenue: instructor.revenue,
              profilePic: instructor.profilePic,
            })),
          },
          trailer: {
            create: {
              title: course.trailer.title,
              slug: course.trailer.slug,
              url: course.trailer.url,
              order: course.trailer.order,
              status: course.trailer.status,
            },
          },
          isPublished: true,
        },
      });
    } else {
      // create a new version of the course
      publisedCourse = await db.courseVersion.create({
        data: {
          title: course.title,
          subtitle: course.subtitle,
          slug: course.slug,
          image: course.image,
          description: course.description,
          price: course.price,
          course: {
            connect: {
              id: course.courseId,
            },
          },
          chapters: {
            create: course.chapters.map((chapter) => ({
              title: chapter.title,
              slug: chapter.slug,
              order: chapter.order,
              videos: {
                create: chapter.videos.map((video) => ({
                  title: video.title,
                  slug: video.slug,
                  description: video.description,
                  order: video.order,
                  url: video.url,
                  status: video.status,
                  attachments: {
                    create: video.attachments.map((attachment) => ({
                      name: attachment.name,
                      url: attachment.url,
                      type: attachment.type,
                      size: attachment.size,
                    })),
                  },
                })),
              },
              documents: {
                create: chapter.documents.map((document) => ({
                  title: document.title,
                  slug: document.slug,
                  order: document.order,
                  attachments: {
                    create: document.attachments.map((attachment) => ({
                      name: attachment.name,
                      url: attachment.url,
                      type: attachment.type,
                      size: attachment.size,
                    })),
                  },
                })),
              },
            })),
          },
          learnings: {
            create: course.learnings.map((learning) => ({
              title: learning.title,
              description: learning.description,
            })),
          },
          instructors: {
            create: course.instructors.map((instructor) => ({
              name: instructor.name,
              specialization: instructor.specialization,
              experienceYears: instructor.experienceYears,
              followers: instructor.followers,
              revenue: instructor.revenue,
              profilePic: instructor.profilePic,
            })),
          },
          trailer: {
            create: {
              title: course.trailer.title,
              slug: course.trailer.slug,
              url: course.trailer.url,
              order: course.trailer.order,
              status: course.trailer.status,
            },
          },
          isPublished: true,
        },
      });
    }

    return publisedCourse;
  }

  async createChapter(courseSlug: string, title: string) {
    const course = await this.findCourseBySlug(courseSlug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapterSlug = slugify(title);

    const existingChapter = await db.chapter.findUnique({
      where: {
        courseVersionId_slug: {
          courseVersionId: course.id,
          slug: chapterSlug,
        },
      },
    });

    if (existingChapter) {
      throw new BadRequestException('Chapter with this name already exists');
    }

    const chapter = await db.chapter.create({
      data: {
        title,
        slug: chapterSlug,
        order: course._count.chapters + 1,
        courseVersionId: course.id,
      },
    });

    return chapter;
  }

  async getChapters(courseSlug: string, user: JwtPayload) {
    const course = await this.findCourseBySlug(
      courseSlug,
      user.role === 'ADMIN',
    );

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapters = await db.chapter.findMany({
      where: {
        courseVersionId: course.id,
      },
      include: {
        documents: {
          select: {
            id: true,
            title: true,
            slug: true,
            order: true,
          },
        },
        videos: {
          select: {
            id: true,
            title: true,
            slug: true,
            order: true,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    return chapters.map((chapter) => {
      return {
        ...chapter,
        lessons: [
          ...chapter.documents.map((doc) => ({ ...doc, type: 'document' })),
          ...chapter.videos.map((video) => ({ ...video, type: 'video' })),
        ].sort((a, b) => a.order - b.order),
      };
    });
  }

  async updateChapter(
    courseSlug: string,
    chapterSlug: string,
    dto: UpdateChapterDto,
  ) {
    const course = await this.findCourseBySlug(courseSlug);
    const newSlug = slugify(dto.title);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        courseVersionId_slug: {
          courseVersionId: course.id,
          slug: chapterSlug,
        },
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    if (dto.title) {
      const existingChapter = await db.chapter.findUnique({
        where: {
          courseVersionId_slug: {
            courseVersionId: course.id,
            slug: newSlug,
          },
        },
      });

      if (existingChapter && existingChapter.id !== chapter.id) {
        throw new BadRequestException('Chapter with this name already exists');
      }
    }

    const updatedChapter = await db.chapter.update({
      where: {
        id: chapter.id,
      },
      data: {
        ...dto,
        slug: newSlug,
      },
    });

    return updatedChapter;
  }

  async deleteChapter(courseSlug: string, chapterSlug: string) {
    const course = await this.findCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        courseVersionId_slug: {
          courseVersionId: course.id,
          slug: chapterSlug,
        },
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    await db.chapter.delete({
      where: {
        id: chapter.id,
      },
    });

    return {
      message: 'Chapter deleted successfully',
    };
  }

  async createDocument(
    courseSlug: string,
    chapterSlug: string,
    dto: CreateDocumentDto,
  ) {
    const course = await this.findCourseBySlug(courseSlug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        courseVersionId_slug: {
          courseVersionId: course.id,
          slug: chapterSlug,
        },
      },
      include: {
        _count: {
          select: {
            documents: true,
            videos: true,
          },
        },
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const documentSlug = slugify(dto.title);

    const existingDocument = await db.document.findUnique({
      where: {
        chapterId_slug: {
          chapterId: chapter.id,
          slug: documentSlug,
        },
      },
    });

    if (existingDocument) {
      throw new BadRequestException('Document with this name already exists');
    }

    const document = await db.document.create({
      data: {
        title: dto.title,
        slug: documentSlug,
        order: chapter._count.documents + chapter._count.videos + 1,
        chapterId: chapter.id,
      },
    });

    return document;
  }

  async updateDocument(
    courseSlug: string,
    chapterSlug: string,
    documentSlug: string,
    dto: UpdateDocumentDto,
  ) {
    const course = await this.findCourseBySlug(courseSlug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        courseVersionId_slug: {
          courseVersionId: course.id,
          slug: chapterSlug,
        },
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const document = await db.document.findUnique({
      where: {
        chapterId_slug: {
          chapterId: chapter.id,
          slug: documentSlug,
        },
      },
    });

    if (!document) {
      throw new BadRequestException('Document not found');
    }

    if (dto.title) {
      const newSlug = slugify(dto.title);

      const existingDocument = await db.document.findUnique({
        where: {
          chapterId_slug: {
            chapterId: chapter.id,
            slug: newSlug,
          },
        },
      });

      if (existingDocument && existingDocument.id !== document.id) {
        throw new BadRequestException('Document with this name already exists');
      }

      document.slug = newSlug;
    }

    const updatedDocument = await db.document.update({
      where: {
        id: document.id,
      },
      data: {
        ...dto,
        slug: document.slug,
      },
    });

    return updatedDocument;
  }

  async getLesson(
    courseSlug: string,
    chapterSlug: string,
    lessonSlug: string,
    user: JwtPayload,
  ) {
    const course = await this.findCourseBySlug(
      courseSlug,
      user.role === 'ADMIN',
    );

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        courseVersionId_slug: {
          courseVersionId: course.id,
          slug: chapterSlug,
        },
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const queries = [
      db.document.findUnique({
        where: {
          chapterId_slug: {
            chapterId: chapter.id,
            slug: lessonSlug,
          },
        },
        include: {
          attachments: true,
        },
      }),
      db.video.findUnique({
        where: {
          chapterId_slug: {
            chapterId: chapter.id,
            slug: lessonSlug,
          },
        },
        include: {
          attachments: true,
        },
      }),
    ];

    const [document, video] = await Promise.all(queries);

    if (!document && !video) {
      throw new BadRequestException('Lesson not found');
    }

    if (document) {
      return {
        type: 'document',
        ...document,
      };
    }

    return {
      type: 'video',
      ...video,
    };
  }

  async addAttachmentToDoc(
    courseSlug: string,
    chapterSlug: string,
    documentSlug: string,
    dto: CreateAttachmentDto,
  ) {
    const course = await this.findCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        courseVersionId_slug: {
          courseVersionId: course.id,
          slug: chapterSlug,
        },
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const document = await db.document.findUnique({
      where: {
        chapterId_slug: {
          chapterId: chapter.id,
          slug: documentSlug,
        },
      },
    });

    if (!document) {
      throw new BadRequestException('Document not found');
    }

    const attachment = await db.attachment.create({
      data: {
        ...dto,
        documentId: document.id,
      },
    });

    return attachment;
  }

  async addAttachmentToVideo(
    courseSlug: string,
    chapterSlug: string,
    videoSlug: string,
    dto: CreateAttachmentDto,
  ) {
    const course = await this.findCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        courseVersionId_slug: {
          courseVersionId: course.id,
          slug: chapterSlug,
        },
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const video = await db.video.findUnique({
      where: {
        chapterId_slug: {
          chapterId: chapter.id,
          slug: videoSlug,
        },
      },
    });

    if (!video) {
      throw new BadRequestException('Video not found');
    }

    const attachment = await db.attachment.create({
      data: {
        ...dto,
        videoId: video.id,
      },
    });

    return attachment;
  }

  async createVideo(
    courseSlug: string,
    chapterSlug: string,
    dto: CreateVideoDto,
  ) {
    const course = await this.findCourseBySlug(courseSlug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        courseVersionId_slug: {
          courseVersionId: course.id,
          slug: chapterSlug,
        },
      },
      include: {
        _count: {
          select: {
            documents: true,
            videos: true,
          },
        },
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const videoSlug = slugify(dto.title);

    const existingVideo = await db.video.findUnique({
      where: {
        chapterId_slug: {
          chapterId: chapter.id,
          slug: videoSlug,
        },
      },
    });
    if (existingVideo) {
      throw new BadRequestException('Video with this name already exists');
    }

    const video = await db.video.create({
      data: {
        title: dto.title,
        slug: videoSlug,
        order: chapter._count.documents + chapter._count.videos + 1,
        chapterId: chapter.id,
      },
    });

    return video;
  }

  async updateVideo(
    courseSlug: string,
    chapterSlug: string,
    videoSlug: string,
    dto: UpdateVideoDto,
  ) {
    const course = await this.findCourseBySlug(courseSlug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        courseVersionId_slug: {
          courseVersionId: course.id,
          slug: chapterSlug,
        },
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const video = await db.video.findUnique({
      where: {
        chapterId_slug: {
          chapterId: chapter.id,
          slug: videoSlug,
        },
      },
    });

    if (!video) {
      throw new BadRequestException('Video not found');
    }

    if (dto.title) {
      const newSlug = slugify(dto.title);

      const existingVideo = await db.video.findUnique({
        where: {
          chapterId_slug: {
            chapterId: chapter.id,
            slug: newSlug,
          },
        },
      });

      if (existingVideo && existingVideo.id !== video.id) {
        throw new BadRequestException('Video with this name already exists');
      }

      video.slug = newSlug;
    }

    const updatedVideo = await db.video.update({
      where: {
        id: video.id,
      },
      data: {
        ...dto,
        slug: video.slug,
      },
    });

    return updatedVideo;
  }

  //TODO: Impletement api key for this as this is a public endpoint
  async updateVideoStatus(videoId: string, status: VideoStatus, key?: string) {
    // check if the status is valid
    if (!Object.values(VideoStatus).includes(status)) {
      throw new BadRequestException(
        'Status is not valid. It should be one of the following: NOT_STARTED, PENDING, PROCESSING, READY, FAILED',
      );
    }

    const video = await db.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      throw new BadRequestException('Video not found');
    }

    if (status === VideoStatus.READY) {
      if (!key) {
        throw new BadRequestException(
          'Video Source key is required to update video status to READY',
        );
      }

      const updatedVideo = await db.video.update({
        where: {
          id: video.id,
        },
        data: {
          status,
          url: `hls/${key}/index.m3u8`,
        },
      });

      return updatedVideo;
    }

    const updatedVideo = await db.video.update({
      where: {
        id: video.id,
      },
      data: {
        status,
      },
    });

    return updatedVideo;
  }

  async createLearning(courseSlug: string, dto: CreateLearningDto) {
    const course = await this.findCourseBySlug(courseSlug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const learning = await db.courseLearnings.create({
      data: {
        ...dto,
        courseVersionId: course.id,
      },
    });

    return learning;
  }

  async getLearnings(courseSlug: string, user: JwtPayload) {
    const course = await this.findCourseBySlug(
      courseSlug,
      user.role === 'ADMIN',
    );

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const learnings = await db.courseLearnings.findMany({
      where: {
        courseVersionId: course.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return learnings;
  }

  async updateLearning(
    courseSlug: string,
    learningId: string,
    dto: UpdateLeaningDto,
  ) {
    const course = await this.findCourseBySlug(courseSlug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const learning = await db.courseLearnings.findUnique({
      where: {
        id: learningId,
      },
    });

    if (!learning) {
      throw new BadRequestException('Learning not found');
    }

    const updatedLearning = await db.courseLearnings.update({
      where: {
        id: learning.id,
      },
      data: dto,
    });

    return updatedLearning;
  }

  async deleteLearning(courseSlug: string, learningId: string) {
    const course = await this.findCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const learning = await db.courseLearnings.findUnique({
      where: {
        id: learningId,
      },
    });

    if (!learning) {
      throw new BadRequestException('Learning not found');
    }

    await db.courseLearnings.delete({
      where: {
        id: learning.id,
      },
    });

    return {
      message: 'Learning deleted successfully',
    };
  }

  async createInstructor(courseSlug: string, dto: CreateInstructorDto) {
    const course = await this.findCourseBySlug(courseSlug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const instructor = await db.instructor.create({
      data: {
        ...dto,
        courseVersionId: course.id,
      },
    });

    return instructor;
  }

  async getInstructors(courseSlug: string, user: JwtPayload) {
    const course = await this.findCourseBySlug(
      courseSlug,
      user.role === 'ADMIN',
    );

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const instructors = await db.instructor.findMany({
      where: {
        courseVersionId: course.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return instructors;
  }

  async updateInstructor(
    courseSlug: string,
    instructorId: string,
    dto: UpdateInstructorDto,
  ) {
    const course = await this.findCourseBySlug(courseSlug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const instructor = await db.instructor.findUnique({
      where: {
        id: instructorId,
      },
    });

    if (!instructor) {
      throw new BadRequestException('Instructor not found');
    }

    const updatedInstructor = await db.instructor.update({
      where: {
        id: instructor.id,
      },
      data: dto,
    });

    return updatedInstructor;
  }

  async getCourseTrailer(courseSlug: string) {
    const course = await this.findCourseBySlug(courseSlug, true);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    if (!course.trailer) {
      throw new BadRequestException('Trailer not found for this course');
    }

    return course.trailer;
  }

  async getCourseOverview(courseSlug: string, user: JwtPayload) {
    const course = await this.findCourseBySlug(
      courseSlug,
      user.role === 'ADMIN',
    );

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const {
      _sum: { totalOrders, totalSales },
    } = await db.monthlyAnalytics.aggregate({
      _sum: {
        totalSales: true,
        totalOrders: true,
      },
      where: {
        courseId: course.courseId,
      },
    });

    const previousAnalytics = await db.course.findUnique({
      where: {
        id: course.courseId,
      },
      select: {
        monthlyAnalytics: {
          where: {
            createdAt: {
              gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        dailyAnalytics: {
          where: {
            createdAt: {
              gte: new Date(new Date().setMonth(new Date().getMonth() - 3)),
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    const monthlySales =
      previousAnalytics.monthlyAnalytics[
        previousAnalytics.monthlyAnalytics.length - 1
      ]?.monthlySales;

    return {
      totalSales,
      totalOrders,
      monthlySales,
      analytics: {
        dailyAnalytics: this.generateDailyAnalytics(
          previousAnalytics.dailyAnalytics,
          course.createdAt,
        ),
        monthlyAnalytics: this.generateMonthlyAnalytics(
          previousAnalytics.monthlyAnalytics,
          course.createdAt,
        ),
      },
    };
  }

  private generateDailyAnalytics(
    analytics: DailyAnalytics[],
    coursePublishedAt: Date,
  ) {
    const today = new Date();
    const startDate = max([subMonths(today, 3), coursePublishedAt]);
    const endDate = today;

    const allDates = eachDayOfInterval({ start: startDate, end: endDate });

    return allDates.map((date) => {
      const existing = analytics.find(
        (a) => a.createdAt.toDateString() === date.toDateString(),
      );
      return {
        createdAt: date,
        totalSales: existing?.totalSales || 0,
      };
    });
  }

  private generateMonthlyAnalytics(
    analytics: MonthlyAnalytics[],
    coursePublishedAt: Date,
  ) {
    const today = new Date();
    const startDate = max([subMonths(today, 3), coursePublishedAt]);
    const endDate = today;

    const allDates = eachMonthOfInterval({ start: startDate, end: endDate });

    return allDates.map((date) => {
      const existing = analytics.find(
        (a) => a.createdAt.toDateString() === date.toDateString(),
      );
      return {
        createdAt: date,
        totalSales: existing?.totalSales || 0,
        monthlySales: existing?.monthlySales || 0,
        totalOrders: existing?.totalOrders || 0,
      };
    });
  }
}
