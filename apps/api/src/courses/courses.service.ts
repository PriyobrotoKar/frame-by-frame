import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create.course';
import { slugify } from '@/common/utils';
import { db } from '@frame-by-frame/db';
import { UpdateChapterDto } from './dto/update.chapter';
import { CreateDocumentDto } from './dto/create.document';
import { UpdateDocumentDto } from './dto/update.document';
import { CreateAttachmentDto } from './dto/create.attachment';
import { CreateVideoDto } from './dto/create.video';
import { UpdateVideoDto } from './dto/update.video';

@Injectable()
export class CoursesService {
  constructor() {}

  async createCourse(dto: CreateCourseDto) {
    const slug = slugify(dto.title);

    // check if course with the same slug already exists
    const existingCourse = await this.getCourseBySlug(slug);

    if (existingCourse) {
      throw new BadRequestException('Course with this name already exists');
    }

    // create new course
    const course = await db.course.create({
      data: {
        title: dto.title,
        slug,
      },
    });

    return course;
  }

  async getCourses() {
    const courses = await db.course.findMany();

    return courses;
  }

  async getCourseBySlug(slug: string) {
    const course = await db.course.findUnique({
      where: {
        slug,
      },
      include: {
        _count: {
          select: {
            chapters: true,
          },
        },
      },
    });

    return course;
  }

  async createChapter(courseSlug: string, title: string) {
    const course = await this.getCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapterSlug = slugify(title);

    const existingChapter = await db.chapter.findUnique({
      where: {
        slug: chapterSlug,
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
        courseId: course.id,
      },
    });

    return chapter;
  }

  async getChapters(courseSlug: string) {
    const course = await this.getCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapters = await db.chapter.findMany({
      where: {
        courseId: course.id,
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
    const course = await this.getCourseBySlug(courseSlug);
    const newSlug = slugify(dto.title);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        slug: chapterSlug,
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    if (dto.title) {
      const existingChapter = await db.chapter.findUnique({
        where: {
          slug: newSlug,
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
    const course = await this.getCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        slug: chapterSlug,
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
    const course = await this.getCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        slug: chapterSlug,
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
        slug: documentSlug,
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
    const course = await this.getCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        slug: chapterSlug,
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const document = await db.document.findUnique({
      where: {
        slug: documentSlug,
        chapterId: chapter.id,
      },
    });

    if (!document) {
      throw new BadRequestException('Document not found');
    }

    if (dto.title) {
      const newSlug = slugify(dto.title);

      const existingDocument = await db.document.findUnique({
        where: {
          slug: newSlug,
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

  async getLesson(courseSlug: string, chapterSlug: string, lessonSlug: string) {
    const course = await this.getCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        slug: chapterSlug,
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const queries = [
      db.document.findUnique({
        where: {
          slug: lessonSlug,
          chapter: {
            slug: chapterSlug,
          },
        },
        include: {
          attachments: true,
        },
      }),
      db.video.findUnique({
        where: {
          slug: lessonSlug,
          chapter: {
            slug: chapterSlug,
          },
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

  async addAttachment(
    courseSlug: string,
    chapterSlug: string,
    documentSlug: string,
    dto: CreateAttachmentDto,
  ) {
    const course = await this.getCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        slug: chapterSlug,
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const document = await db.document.findUnique({
      where: {
        slug: documentSlug,
        chapterId: chapter.id,
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

  async createVideo(
    courseSlug: string,
    chapterSlug: string,
    dto: CreateVideoDto,
  ) {
    const course = await this.getCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        slug: chapterSlug,
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
        slug: videoSlug,
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
    const course = await this.getCourseBySlug(courseSlug);

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    const chapter = await db.chapter.findUnique({
      where: {
        slug: chapterSlug,
      },
    });

    if (!chapter) {
      throw new BadRequestException('Chapter not found');
    }

    const video = await db.video.findUnique({
      where: {
        slug: videoSlug,
        chapterId: chapter.id,
      },
    });

    if (!video) {
      throw new BadRequestException('Video not found');
    }

    if (dto.title) {
      const newSlug = slugify(dto.title);

      const existingVideo = await db.video.findUnique({
        where: {
          slug: newSlug,
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
}
