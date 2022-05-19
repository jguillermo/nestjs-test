import { Injectable } from '@nestjs/common';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Course } from '../../domain/course';
import { CourseId } from '../../domain/course-id';
import { CourseDao } from './course.dao';
import { CourseRepository } from '../../domain/course.repository';
import { FirestoreService } from '../../../share/infrastructure/firestore/firestore.service';

@Injectable()
export class CourseFirestoreRepository extends CourseRepository {
  private _collection = 'courses';

  constructor(private readonly firestore: FirestoreService) {
    super();
  }

  async persist(course: Course): Promise<void> {
    const dao = CourseDao.fromAggregate(course);
    await this.firestore.persist(this._collection, dao.id, dao.data);
  }

  async findById(id: CourseId): Promise<Course | null> {
    const item = await this.firestore.findOneDocumentById(this._collection, id.value);
    if (!item) {
      return null;
    }
    return CourseDao.fromItem(item).toAggregate();
  }

  async findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<Course[]> {
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
      return CourseDao.fromItem(item).toAggregate();
    });
  }

  async deleteById(id: CourseId): Promise<void> {
    await this.firestore.delete(this._collection, id.value);
  }
}
