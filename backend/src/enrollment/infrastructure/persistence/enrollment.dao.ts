import { Enrollment } from '../../domain/enrollment';
import { EnrollmentId } from '../../domain/enrollment-id';
import { EnrollmentCourse } from '../../domain/enrollment-course';
import { EnrollmentStudent } from '../../domain/enrollment-student';
import { ItemDto } from '../../../share/infrastructure/firestore/firestore.service';

export class EnrollmentDao {
  id: string;
  course: string;
  student: string;

  static fromAggregate(enrollment: Enrollment): EnrollmentDao {
    const dao = new EnrollmentDao();
    dao.id = enrollment.id.value;
    dao.course = enrollment.course.value;
    dao.student = enrollment.student.value;
    return dao;
  }

  static fromItem(item: ItemDto): EnrollmentDao {
    const dao = new EnrollmentDao();
    //item.data.id = item.id
    dao.id = item.data.id;
    dao.course = item.data.course;
    dao.student = item.data.student;
    return dao;
  }

  get data() {
    return {
      id: this.id,
      course: this.course,
      student: this.student,
    };
  }

  toAggregate(): Enrollment {
    return new Enrollment(
      new EnrollmentId(this.id),
      new EnrollmentCourse(this.course),
      new EnrollmentStudent(this.student),
    );
  }
}
