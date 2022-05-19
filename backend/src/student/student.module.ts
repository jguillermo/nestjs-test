import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StudentFirestoreRepository } from './infrastructure/persistence/student-firestore.repository';
import { StudentRepository } from './domain/student.repository';
import { ShareModule } from '../share/share.module';
import { StudentResolver } from './infrastructure/graph-ql/student.resolver';
import { AppEvents } from './infrastructure/event';
import { ApplicationHandlers, ApplicationServices } from './application';

@Module({
  imports: [CqrsModule, ShareModule],
  providers: [
    {
      provide: StudentRepository,
      useClass: StudentFirestoreRepository,
    },
    ...ApplicationHandlers,
    ...ApplicationServices,
    ...AppEvents,
    StudentResolver,
  ],
})
export class StudentModule {}
