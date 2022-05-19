import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CourseFirestoreRepository } from './infrastructure/persistence/course-firestore.repository';
import { CourseRepository } from './domain/course.repository';
import { ShareModule } from '../share/share.module';
import { CourseResolver } from './infrastructure/graph-ql/course.resolver';
import { AppEvents } from './infrastructure/event';
import { ApplicationHandlers, ApplicationServices } from './application';

@Module({
  imports: [CqrsModule, ShareModule],
  providers: [
    {
      provide: CourseRepository,
      useClass: CourseFirestoreRepository,
    },
    ...ApplicationHandlers,
    ...ApplicationServices,
    ...AppEvents,
    CourseResolver,
  ],
})
export class CourseModule {}
