import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Student } from './student';
import { StudentId } from './student-id';

export abstract class StudentRepository {
  abstract persist(student: Student): Promise<void>;

  abstract findById(id: StudentId): Promise<Student | null>;

  abstract findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<Student[]>;

  abstract deleteById(id: StudentId): Promise<void>;
}
