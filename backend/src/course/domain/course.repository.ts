import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Course } from './course';
import { CourseId } from './course-id';

export abstract class CourseRepository {
  abstract persist(course: Course): Promise<void>;

  abstract findById(id: CourseId): Promise<Course | null>;

  abstract findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<Course[]>;

  abstract deleteById(id: CourseId): Promise<void>;
}
