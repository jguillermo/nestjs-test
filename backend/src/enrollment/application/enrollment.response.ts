import { Enrollment } from '../domain/enrollment';

export class EnrollmentResponse {
  constructor(public id: string, public course: string, public studentId: string) {}

  static fromAggregate(enrollment: Enrollment) {
    return new EnrollmentResponse(enrollment.id.value, enrollment.course.value, enrollment.student.value);
  }
}
