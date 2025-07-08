import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
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
import { ApiKeyGuard } from '@/auth/guards/api-key.guard';
import { UpdateCourseDto } from './dto/update.course';
import { CreateLearningDto } from './dto/create.learning';
import { UpdateLeaningDto } from './dto/update.learning';
import { CreateInstructorDto } from './dto/create.instructor';
import { UpdateInstructorDto } from './dto/update.instructor';
import CurrentUser from '@/decorators/user.decorator';
import { type JwtPayload } from '@/types/jwt.payload';
import { type Response } from 'express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Admin()
  @Post()
  async createCourse(@Body() body: CreateCourseDto) {
    return this.coursesService.createCourse(body);
  }

  @Admin()
  @Get('/admin')
  async getAllCourses() {
    return this.coursesService.getCourses(true);
  }

  @Get('library')
  async getLibraryCourses(@CurrentUser() user: JwtPayload) {
    return this.coursesService.getLibraryCourses(user);
  }

  @Get('activity')
  async getActivity(@CurrentUser() user: JwtPayload) {
    return this.coursesService.getUserActivity(user);
  }

  @Public()
  @Get(':slug')
  async getCourseBySlug(@Param('slug') slug: string) {
    return this.coursesService.getCourseBySlug(slug);
  }

  @Admin()
  @Get(':slug/admin')
  async getCourseAdmin(@Param('slug') slug: string) {
    return this.coursesService.getCourseBySlug(slug, true);
  }

  @Public()
  @Get()
  async getCourses() {
    return this.coursesService.getCourses();
  }

  @Admin()
  @Patch(':slug')
  async updateCourse(
    @Param('slug') slug: string,
    @Body() body: UpdateCourseDto,
  ) {
    return this.coursesService.updateCourse(slug, body);
  }

  @Admin()
  @Post(':slug/trailer')
  async addTrailer(@Param('slug') slug: string) {
    return this.coursesService.addTrailer(slug);
  }

  @Admin()
  @Get(':slug/trailer')
  async getTrailer(@Param('slug') slug: string) {
    return this.coursesService.getCourseTrailer(slug);
  }

  @Admin()
  @Post(':slug/publish')
  async publishCourse(@Param('slug') slug: string) {
    return this.coursesService.publishCourse(slug);
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
  async getChapters(
    @Param('slug') slug: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.getChapters(slug, user);
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
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.getLesson(slug, chapterSlug, lessonSlug, user);
  }

  @Get(':slug/video/hls/*path')
  async getHlsStream(
    @Param('slug') slug: string,
    @Param('path') paths: string[],
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(paths);
    const playlist = await this.coursesService.getHlsStream(slug, paths, user);
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(playlist);
  }

  @Admin()
  @Post(
    ':slug/chapters/:chapterSlug/lessons/documents/:documentSlug/attachments',
  )
  async addAttachmentToDoc(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('documentSlug') documentSlug: string,
    @Body() body: CreateAttachmentDto,
  ) {
    return this.coursesService.addAttachmentToDoc(
      slug,
      chapterSlug,
      documentSlug,
      body,
    );
  }

  @Admin()
  @Post(':slug/chapters/:chapterSlug/lessons/videos/:videoSlug/attachments')
  async addAttachmentToVideo(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('videoSlug') videoSlug: string,
    @Body() body: CreateAttachmentDto,
  ) {
    return this.coursesService.addAttachmentToVideo(
      slug,
      chapterSlug,
      videoSlug,
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

  @Public()
  @UseGuards(ApiKeyGuard)
  @Patch('lessons/videos/:videoId/status')
  async updateVideoStatus(
    @Param('videoId') videoId: string,
    @Query('status') status: VideoStatus,
    @Query('key') key?: string,
  ) {
    return this.coursesService.updateVideoStatus(videoId, status, key);
  }

  @Admin()
  @Delete(':slug/chapters/:chapterSlug/lessons/videos/:videoSlug')
  async deleteVideo(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('videoSlug') videoSlug: string,
  ) {
    return this.coursesService.deleteVideo(slug, chapterSlug, videoSlug);
  }

  @Admin()
  @Post(':slug/learnings')
  async createLearning(
    @Param('slug') slug: string,
    @Body() body: CreateLearningDto,
  ) {
    return this.coursesService.createLearning(slug, body);
  }

  @Get(':slug/learnings')
  async getLearnings(
    @Param('slug') slug: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.getLearnings(slug, user);
  }

  @Admin()
  @Patch(':slug/learnings/:learningId')
  async editLearning(
    @Param('slug') slug: string,
    @Param('learningId') learningId: string,
    @Body() body: UpdateLeaningDto,
  ) {
    return this.coursesService.updateLearning(slug, learningId, body);
  }

  @Admin()
  @Delete(':slug/learnings/:learningId')
  async deleteLearning(
    @Param('slug') slug: string,
    @Param('learningId') learningId: string,
  ) {
    return this.coursesService.deleteLearning(slug, learningId);
  }

  @Admin()
  @Post(':slug/instructors')
  async addInstructor(
    @Param('slug') slug: string,
    @Body() body: CreateInstructorDto,
  ) {
    return this.coursesService.createInstructor(slug, body);
  }

  @Get(':slug/instructors')
  async getInstructors(
    @Param('slug') slug: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.getInstructors(slug, user);
  }

  @Admin()
  @Patch(':slug/instructors/:instructorId')
  async updateInstructor(
    @Param('slug') slug: string,
    @Param('instructorId') instructorId: string,
    @Body() body: UpdateInstructorDto,
  ) {
    return this.coursesService.updateInstructor(slug, instructorId, body);
  }

  @Admin()
  @Get(':slug/analytics/overview')
  async getCourseOverview(
    @Param('slug') slug: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.getCourseOverview(slug, user);
  }

  @Post(':slug/chapters/:chapterSlug/lessons/videos/:videoSlug/progress')
  async updateVideoProgress(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('videoSlug') videoSlug: string,
    @Body() body: { progress: number },
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.updateVideoProgress(
      slug,
      chapterSlug,
      videoSlug,
      body.progress,
      user,
    );
  }

  @Post(':slug/chapters/:chapterSlug/lessons/documents/:documentSlug/progress')
  async updateDocumentProgress(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('documentSlug') documentSlug: string,
    @Body() body: { progress: number },
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.updateDocumentProgress(
      slug,
      chapterSlug,
      documentSlug,
      body.progress,
      user,
    );
  }

  @Get(':slug/chapters/:chapterSlug/lessons/:lessonSlug/progress')
  async getLessonProgress(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @Param('lessonSlug') lessonSlug: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.getLessonProgress(
      slug,
      chapterSlug,
      lessonSlug,
      user,
    );
  }

  @Get(':slug/chapters/:chapterSlug/progress')
  async getChapterProgress(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.getChapterProgress(slug, chapterSlug, user);
  }

  @Get(':slug/progress')
  async getCourseProgress(
    @Param('slug') slug: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.getCourseProgress(slug, user);
  }

  @Post('activity/:slug/chapters/:chapterId/lessons/:lessonId')
  async updateUserActivity(
    @Param('slug') slug: string,
    @Param('chapterId') chapterId: string,
    @Param('lessonId') lessonId: string,
    @Body() body: { type: 'video' | 'document' },
    @CurrentUser() user: JwtPayload,
  ) {
    return this.coursesService.updateUserActivity(
      slug,
      chapterId,
      lessonId,
      body.type,
      user,
    );
  }
}
