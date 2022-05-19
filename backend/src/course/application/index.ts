import { CourseDeleteHandler } from './delete/course-delete.handler';
import { CourseFindByIdHandler } from './find-by-id/course-find-by-id.handler';
import { CourseListHandler } from './list/course-list.handler';
import { CoursePersistHandler } from './persist/course-persist.handler';
import { CourseUpdateEnrollmentHandler } from './update-enrollment/course-update-enrollment.handler';
import { CourseDeleteService } from './delete/course-delete.service';
import { CourseFindByIdService } from './find-by-id/course-find-by-id.service';
import { CourseListService } from './list/course-list.service';
import { CoursePersistService } from './persist/course-persist.service';
import { CourseUpdateEnrollmentService } from './update-enrollment/course-update-enrollment.service';

export const ApplicationHandlers = [
  CourseDeleteHandler,
  CourseFindByIdHandler,
  CourseListHandler,
  CoursePersistHandler,
  CourseUpdateEnrollmentHandler,
];
export const ApplicationServices = [
  CourseDeleteService,
  CourseFindByIdService,
  CourseListService,
  CoursePersistService,
  CourseUpdateEnrollmentService,
];
