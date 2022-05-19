import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CourseUpdateEnrollmentService } from './course-update-enrollment.service';
import { CourseUpdateEnrollmentDto } from '../../../share/application/dto/course-update-enrollment.dto';
import { CourseId } from '../../domain/course-id';
import { CourseEnrollments } from '../../domain/course-enrollments';

@CommandHandler(CourseUpdateEnrollmentDto)
export class CourseUpdateEnrollmentHandler implements ICommandHandler<CourseUpdateEnrollmentDto> {
  constructor(private service: CourseUpdateEnrollmentService) {}

  async execute(dto: CourseUpdateEnrollmentDto): Promise<void> {
    const id = new CourseId(dto.id);
    const enrollments = new CourseEnrollments(dto.enrollments);

    await this.service.execute(id, enrollments);
  }
}
