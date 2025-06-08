import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create.course';
import Admin from '@/decorators/admin.decorator';
import { UpdateChapterDto } from './dto/update.chapter';
import { CreateDocumentDto } from './dto/create.document';
import { UpdateDocumentDto } from './dto/update.document';
import { CreateAttachmentDto } from './dto/create.attachment';
import { CreateVideoDto } from './dto/create.video';
import { UpdateVideoDto } from './dto/update.video';
import Public from '@/decorators/public.decorator';
import { VideoStatus } from '@frame-by-frame/db';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Admin()
  @Post()
  async createCourse(@Body() body: CreateCourseDto) {
    return this.coursesService.createCourse(body);
  }

  @Get(':slug')
  async getCourseBySlug(@Param('slug') slug: string) {
    return this.coursesService.getCourseBySlug(slug);
  }

  @Get()
  async getCourses() {
    return this.coursesService.getCourses();
  }

  @Admin()
  @Post(':slug/chapters')
  async createChapter(
    @Param('slug') slug: string,
    @Body() body: { title: string },
  ) {
    return this.coursesService.createChapter(slug, body.title);
  }

  @Admin()
  @Patch(':slug/chapters/:chapterSlug')
  async updateChapter(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Body() body: UpdateChapterDto,
  ) {
    return this.coursesService.updateChapter(slug, chapterSlug, body);
  }

  @Get(':slug/chapters')
  async getChapters(@Param('slug') slug: string) {
    return this.coursesService.getChapters(slug);
  }

  @Admin()
  @Delete(':slug/chapters/:chapterSlug')
  async deleteChapter(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
  ) {
    return this.coursesService.deleteChapter(slug, chapterSlug);
  }

  @Admin()
  @Post(':slug/chapters/:chapterSlug/lessons/document')
  async createDocument(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Body() body: CreateDocumentDto,
  ) {
    return this.coursesService.createDocument(slug, chapterSlug, body);
  }

  @Admin()
  @Patch(':slug/chapters/:chapterSlug/lessons/documents/:documentSlug')
  async updateDocument(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('documentSlug') documentSlug: string,
    @Body() body: UpdateDocumentDto,
  ) {
    return this.coursesService.updateDocument(
      slug,
      chapterSlug,
      documentSlug,
      body,
    );
  }

  @Get(':slug/chapters/:chapterSlug/lessons/:lessonSlug')
  async getLesson(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('lessonSlug') lessonSlug: string,
  ) {
    return this.coursesService.getLesson(slug, chapterSlug, lessonSlug);
  }

  @Admin()
  @Post(
    ':slug/chapters/:chapterSlug/lessons/documents/:documentSlug/attachments',
  )
  async addAttachment(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('documentSlug') documentSlug: string,
    @Body() body: CreateAttachmentDto,
  ) {
    return this.coursesService.addAttachment(
      slug,
      chapterSlug,
      documentSlug,
      body,
    );
  }

  @Admin()
  @Post(':slug/chapters/:chapterSlug/lessons/videos')
  async createVideo(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Body() body: CreateVideoDto,
  ) {
    return this.coursesService.createVideo(slug, chapterSlug, body);
  }

  @Admin()
  @Patch(':slug/chapters/:chapterSlug/lessons/videos/:videoSlug')
  async updateVideo(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('videoSlug') videoSlug: string,
    @Body() body: UpdateVideoDto,
  ) {
    return this.coursesService.updateVideo(slug, chapterSlug, videoSlug, body);
  }

  //TODO: Impletement api key for this as this is a public endpoint
  @Public()
  @Patch(':slug/chapters/:chapterSlug/lessons/videos/:videoSlug/status')
  async updateVideoStatus(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('videoSlug') videoSlug: string,
    @Query('status') status: VideoStatus,
  ) {
    return this.coursesService.updateVideoStatus(
      slug,
      chapterSlug,
      videoSlug,
      status,
    );
  }
}
