import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { CourseRepository } from '../../domain/course.repository';
import { Course } from '../../domain/course';
import { CourseId } from '../../domain/course-id';
import { CourseName } from '../../domain/course-name';
import { CourseStartAt } from '../../domain/course-start-at';
import { CourseEndAt } from '../../domain/course-end-at';

@Injectable()
export class CoursePersistService {
  constructor(private repository: CourseRepository, private eventBus: EventBus) {}

  public async execute(id: CourseId, name: CourseName, startAt: CourseStartAt, endAt: CourseEndAt): Promise<void> {
    let course = await this.repository.findById(id);
    if (!course) {
      course = Course.create(id, name, startAt, endAt);
    } else {
      course.update(name, startAt, endAt);
    }
    await this.repository.persist(course);
    this.eventBus.publishAll(course.pullDomainEvents());
  }
}
