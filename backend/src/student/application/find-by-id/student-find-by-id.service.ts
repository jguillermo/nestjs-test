import { Injectable } from '@nestjs/common';
import { StudentRepository } from '../../domain/student.repository';
import { StudentResponse } from '../student.response';
import { StudentId } from '../../domain/student-id';

@Injectable()
export class StudentFindByIdService {
  constructor(private repository: StudentRepository) {}

  public async execute(id: StudentId): Promise<StudentResponse | null> {
    const student = await this.repository.findById(id);
    if (!student) {
      return null;
    }
    return StudentResponse.fromAggregate(student);
  }
}
