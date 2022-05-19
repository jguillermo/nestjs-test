import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CourseRepository } from '../../domain/course.repository';
import { CourseId } from '../../domain/course-id';
import { CourseEnrollments } from '../../domain/course-enrollments';

@Injectable()
export class CourseUpdateEnrollmentService {
  constructor(private repository: CourseRepository, private eventBus: EventBus) {}

  public async execute(id: CourseId, enrollments: CourseEnrollments): Promise<void> {
    const course = await this.repository.findById(id);

    course.updateEnrollment(enrollments);
    await this.repository.persist(course);
    this.eventBus.publishAll(course.pullDomainEvents());
  }
}
