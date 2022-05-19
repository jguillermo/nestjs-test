import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../domain/course.repository';
import { CourseResponse } from '../course.response';
import { CourseId } from '../../domain/course-id';

@Injectable()
export class CourseFindByIdService {
  constructor(private repository: CourseRepository) {}

  public async execute(id: CourseId): Promise<CourseResponse | null> {
    const course = await this.repository.findById(id);
    if (!course) {
      return null;
    }
    return CourseResponse.fromAggregate(course);
  }
}
