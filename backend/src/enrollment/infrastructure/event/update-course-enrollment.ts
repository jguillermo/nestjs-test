import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListEnrollmentResponse } from '../../application/list-enrollment.response';
import { EnrollmentListDto } from '../../application/list/enrollment-list.dto';
import { CourseUpdateEnrollmentDto } from '../../../share/application/dto/course-update-enrollment.dto';

export class UpdateCourseEnrollment {
  constructor(protected commandBus: CommandBus, protected queryBus: QueryBus) {}

  async update(course: string) {
    const enrollments: ListEnrollmentResponse = await this.queryBus.execute(EnrollmentListDto.fromCourse(course));
    await this.commandBus.execute(new CourseUpdateEnrollmentDto(course, enrollments.list.length));
  }
}
