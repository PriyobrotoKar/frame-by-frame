import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create.course';
import { slugify } from '@/common/utils';
import { db } from '@frame-by-frame/db';

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
    });

    return course;
  }
}
