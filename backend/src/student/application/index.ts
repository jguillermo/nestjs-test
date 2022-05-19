import { StudentDeleteHandler } from './delete/student-delete.handler';
import { StudentFindByIdHandler } from './find-by-id/student-find-by-id.handler';
import { StudentListHandler } from './list/student-list.handler';
import { StudentPersistHandler } from './persist/student-persist.handler';
import { StudentDeleteService } from './delete/student-delete.service';
import { StudentFindByIdService } from './find-by-id/student-find-by-id.service';
import { StudentListService } from './list/student-list.service';
import { StudentPersistService } from './persist/student-persist.service';

export const ApplicationHandlers = [
  StudentDeleteHandler,
  StudentFindByIdHandler,
  StudentListHandler,
  StudentPersistHandler,
];
export const ApplicationServices = [
  StudentDeleteService,
  StudentFindByIdService,
  StudentListService,
  StudentPersistService,
];
