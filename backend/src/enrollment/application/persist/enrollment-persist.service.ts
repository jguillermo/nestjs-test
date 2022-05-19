import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EnrollmentRepository } from '../../domain/enrollment.repository';
import { Enrollment } from '../../domain/enrollment';
import { EnrollmentId } from '../../domain/enrollment-id';
import { EnrollmentCourse } from '../../domain/enrollment-course';
import { EnrollmentStudent } from '../../domain/enrollment-student';

@Injectable()
export class EnrollmentPersistService {
  constructor(private repository: EnrollmentRepository, private eventBus: EventBus) {}

  public async execute(id: EnrollmentId, course: EnrollmentCourse, student: EnrollmentStudent): Promise<void> {
    let enrollment = await this.repository.findById(id);
    if (!enrollment) {
      enrollment = Enrollment.create(id, course, student);
    } else {
      enrollment.update(course, student);
    }
    await this.repository.persist(enrollment);
    this.eventBus.publishAll(enrollment.pullDomainEvents());
  }
}
