import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Enrollment } from './enrollment';
import { EnrollmentId } from './enrollment-id';

export abstract class EnrollmentRepository {
  abstract persist(enrollment: Enrollment): Promise<void>;

  abstract findById(id: EnrollmentId): Promise<Enrollment | null>;

  abstract findAll(
    filters?: Array<FilterItem>,
    paginator?: PaginatorTypeImp,
    order?: OrderTypeImp,
  ): Promise<Enrollment[]>;

  abstract deleteById(id: EnrollmentId): Promise<void>;
}
