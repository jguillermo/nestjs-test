import { EnrollmentDeleteHandler } from './delete/enrollment-delete.handler';
import { EnrollmentFindByIdHandler } from './find-by-id/enrollment-find-by-id.handler';
import { EnrollmentListHandler } from './list/enrollment-list.handler';
import { EnrollmentPersistHandler } from './persist/enrollment-persist.handler';
import { EnrollmentDeleteService } from './delete/enrollment-delete.service';
import { EnrollmentFindByIdService } from './find-by-id/enrollment-find-by-id.service';
import { EnrollmentListService } from './list/enrollment-list.service';
import { EnrollmentPersistService } from './persist/enrollment-persist.service';

export const ApplicationHandlers = [
  EnrollmentDeleteHandler,
  EnrollmentFindByIdHandler,
  EnrollmentListHandler,
  EnrollmentPersistHandler,
];
export const ApplicationServices = [
  EnrollmentDeleteService,
  EnrollmentFindByIdService,
  EnrollmentListService,
  EnrollmentPersistService,
];
