import { Injectable } from '@nestjs/common';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Enrollment } from '../../domain/enrollment';
import { EnrollmentId } from '../../domain/enrollment-id';
import { EnrollmentDao } from './enrollment.dao';
import { EnrollmentRepository } from '../../domain/enrollment.repository';
import { FirestoreService } from '../../../share/infrastructure/firestore/firestore.service';

@Injectable()
export class EnrollmentFirestoreRepository extends EnrollmentRepository {
  private _collection = 'enrollments';

  constructor(private readonly firestore: FirestoreService) {
    super();
  }

  async persist(enrollment: Enrollment): Promise<void> {
    const dao = EnrollmentDao.fromAggregate(enrollment);
    await this.firestore.persist(this._collection, dao.id, dao.data);
  }

  async findById(id: EnrollmentId): Promise<Enrollment | null> {
    const item = await this.firestore.findOneDocumentById(this._collection, id.value);
    if (!item) {
      return null;
    }
    return EnrollmentDao.fromItem(item).toAggregate();
  }

  async findAll(
    filters?: Array<FilterItem>,
    paginator?: PaginatorTypeImp,
    order?: OrderTypeImp,
  ): Promise<Enrollment[]> {
    if (!Array.isArray(filters)) {
      filters = [];
    }
    if (!paginator) {
      paginator = PaginatorTypeImp.empty();
    }
    if (!order) {
      order = OrderTypeImp.empty();
    }
    const items = await this.firestore.findAll(
      this._collection,
      filters.filter((e) => e.value),
      paginator,
      order,
    );
    return items.map((item) => {
      return EnrollmentDao.fromItem(item).toAggregate();
    });
  }

  async deleteById(id: EnrollmentId): Promise<void> {
    await this.firestore.delete(this._collection, id.value);
  }
}
