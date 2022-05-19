import { BadRequestException, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CourseRepository } from '../../domain/course.repository';
import { CourseId } from '../../domain/course-id';

@Injectable()
export class CourseDeleteService {
  constructor(private repository: CourseRepository, private eventBus: EventBus) {}

  public async execute(id: CourseId): Promise<void> {
    const course = await this.repository.findById(id);
    if (course) {
      if (course.enrollments.value > 0) {
        throw new BadRequestException('there are students enrolled');
      }

      course.delete();
      await this.repository.deleteById(course.id);
      this.eventBus.publishAll(course.pullDomainEvents());
    }
  }
}
