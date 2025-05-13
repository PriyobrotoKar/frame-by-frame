import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create.course';
import Admin from '@/decorators/admin.decorator';
import { UpdateChapterDto } from './dto/update.chapter';

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

  @Delete(':slug/chapters/:chapterSlug')
  async deleteChapter(
    @Param('slug') slug: string,
    @Param('chapterSlug') chapterSlug: string,
  ) {
    return this.coursesService.deleteChapter(slug, chapterSlug);
  }
}
