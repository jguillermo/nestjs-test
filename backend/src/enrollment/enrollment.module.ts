import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EnrollmentFirestoreRepository } from './infrastructure/persistence/enrollment-firestore.repository';
import { EnrollmentRepository } from './domain/enrollment.repository';
import { ShareModule } from '../share/share.module';
import { EnrollmentResolver } from './infrastructure/graph-ql/enrollment.resolver';
import { AppEvents } from './infrastructure/event';
import { ApplicationHandlers, ApplicationServices } from './application';

@Module({
  imports: [CqrsModule, ShareModule],
  providers: [
    {
      provide: EnrollmentRepository,
      useClass: EnrollmentFirestoreRepository,
    },
    ...ApplicationHandlers,
    ...ApplicationServices,
    ...AppEvents,
    EnrollmentResolver,
  ],
})
export class EnrollmentModule {}
