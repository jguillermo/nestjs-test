import { Injectable } from '@nestjs/common';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Student } from '../../domain/student';
import { StudentId } from '../../domain/student-id';
import { StudentDao } from './student.dao';
import { StudentRepository } from '../../domain/student.repository';
import { FirestoreService } from '../../../share/infrastructure/firestore/firestore.service';

@Injectable()
export class StudentFirestoreRepository extends StudentRepository {
  private _collection = 'students';

  constructor(private readonly firestore: FirestoreService) {
    super();
  }

  async persist(student: Student): Promise<void> {
    const dao = StudentDao.fromAggregate(student);
    await this.firestore.persist(this._collection, dao.id, dao.data);
  }

  async findById(id: StudentId): Promise<Student | null> {
    const item = await this.firestore.findOneDocumentById(this._collection, id.value);
    if (!item) {
      return null;
    }
    return StudentDao.fromItem(item).toAggregate();
  }

  async findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<Student[]> {
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
      return StudentDao.fromItem(item).toAggregate();
    });
  }

  async deleteById(id: StudentId): Promise<void> {
    await this.firestore.delete(this._collection, id.value);
  }
}
