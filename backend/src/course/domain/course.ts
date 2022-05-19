import { AggregateRoot } from 'base-ddd';
import { CourseId } from './course-id';
import { CourseName } from './course-name';
import { CourseStartAt } from './course-start-at';
import { CourseEndAt } from './course-end-at';
import { CourseEnrollments } from './course-enrollments';
import { CourseCreatedEvent } from './course-created.event';
import { CourseUpdatedEvent } from './course-updated.event';
import { CourseDeletedEvent } from './course-deleted.event';

export class Course extends AggregateRoot {
  constructor(
    private _id: CourseId,
    private _name: CourseName,
    private _startAt: CourseStartAt,
    private _endAt: CourseEndAt,
    private _enrollments: CourseEnrollments,
  ) {
    super();
  }

  static create(id: CourseId, name: CourseName, startAt: CourseStartAt, endAt: CourseEndAt): Course {
    const enrollments = new CourseEnrollments(0);
    const course = new Course(id, name, startAt, endAt, enrollments);
    course.record(new CourseCreatedEvent(id.value, name.value, startAt.toString, endAt.toString, enrollments.value));
    return course;
  }

  get id(): CourseId {
    return this._id;
  }

  get name(): CourseName {
    return this._name;
  }

  get startAt(): CourseStartAt {
    return this._startAt;
  }

  get endAt(): CourseEndAt {
    return this._endAt;
  }

  get enrollments(): CourseEnrollments {
    return this._enrollments;
  }

  update(name: CourseName, startAt: CourseStartAt, endAt: CourseEndAt): void {
    this._name = name;
    this._startAt = startAt;
    this._endAt = endAt;
    this.record(
      new CourseUpdatedEvent(
        this.id.value,
        this.name.value,
        this.startAt.toString,
        this.endAt.toString,
        this.enrollments.value,
      ),
    );
  }

  delete(): void {
    this.record(
      new CourseDeletedEvent(
        this.id.value,
        this.name.value,
        this.startAt.toString,
        this.endAt.toString,
        this.enrollments.value,
      ),
    );
  }

  updateEnrollment(enrollments: CourseEnrollments) {
    this._enrollments = enrollments;
  }
}
