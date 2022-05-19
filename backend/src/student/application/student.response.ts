import { Student } from '../domain/student';

export class StudentResponse {
  constructor(public id: string, public name: string, public email: string, public createAt: Date) {}

  static fromAggregate(student: Student) {
    return new StudentResponse(student.id.value, student.name.value, student.email.value, student.createAt.value);
  }
}
