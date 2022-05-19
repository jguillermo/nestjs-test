import { AggregateRoot } from 'base-ddd';
import { EnrollmentId } from './enrollment-id';
import { EnrollmentCourse } from './enrollment-course';
import { EnrollmentStudent } from './enrollment-student';
import { EnrollmentCreatedEvent } from './enrollment-created.event';
import { EnrollmentUpdatedEvent } from './enrollment-updated.event';
import { EnrollmentDeletedEvent } from './enrollment-deleted.event';

export class Enrollment extends AggregateRoot {
  constructor(private _id: EnrollmentId, private _course: EnrollmentCourse, private _student: EnrollmentStudent) {
    super();
  }

  static create(id: EnrollmentId, course: EnrollmentCourse, student: EnrollmentStudent): Enrollment {
    const enrollment = new Enrollment(id, course, student);
    enrollment.record(new EnrollmentCreatedEvent(id.value, course.value, student.value));
    return enrollment;
  }

  get id(): EnrollmentId {
    return this._id;
  }

  get course(): EnrollmentCourse {
    return this._course;
  }

  get student(): EnrollmentStudent {
    return this._student;
  }

  update(course: EnrollmentCourse, student: EnrollmentStudent): void {
    this._course = course;
    this._student = student;
    this.record(new EnrollmentUpdatedEvent(this.id.value, this.course.value, this.student.value));
  }

  delete(): void {
    this.record(new EnrollmentDeletedEvent(this.id.value, this.course.value, this.student.value));
  }
}
