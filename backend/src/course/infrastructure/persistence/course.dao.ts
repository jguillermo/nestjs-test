import { Course } from '../../domain/course';
import { CourseId } from '../../domain/course-id';
import { CourseName } from '../../domain/course-name';
import { CourseStartAt } from '../../domain/course-start-at';
import { CourseEndAt } from '../../domain/course-end-at';
import { CourseEnrollments } from '../../domain/course-enrollments';
import { ItemDto } from '../../../share/infrastructure/firestore/firestore.service';

export class CourseDao {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  enrollments: number;

  static fromAggregate(course: Course): CourseDao {
    const dao = new CourseDao();
    dao.id = course.id.value;
    dao.name = course.name.value;
    dao.startAt = course.startAt.value;
    dao.endAt = course.endAt.value;
    dao.enrollments = course.enrollments.value;
    return dao;
  }

  static fromItem(item: ItemDto): CourseDao {
    const dao = new CourseDao();
    //item.data.id = item.id
    dao.id = item.data.id;
    dao.name = item.data.name;
    dao.startAt = item.data.startAt.toDate();
    dao.endAt = item.data.endAt.toDate();
    dao.enrollments = item.data.enrollments;
    return dao;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      startAt: this.startAt,
      endAt: this.endAt,
      enrollments: this.enrollments,
    };
  }

  toAggregate(): Course {
    return new Course(
      new CourseId(this.id),
      new CourseName(this.name),
      new CourseStartAt(this.startAt),
      new CourseEndAt(this.endAt),
      new CourseEnrollments(this.enrollments),
    );
  }
}
