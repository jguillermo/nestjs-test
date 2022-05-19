import { Course } from '../domain/course';

export class CourseResponse {
  constructor(
    public id: string,
    public name: string,
    public startAt: Date,
    public endAt: Date,
    public enrollments: number,
  ) {}

  static fromAggregate(course: Course) {
    return new CourseResponse(
      course.id.value,
      course.name.value,
      course.startAt.value,
      course.endAt.value,
      course.enrollments.value,
    );
  }
}
