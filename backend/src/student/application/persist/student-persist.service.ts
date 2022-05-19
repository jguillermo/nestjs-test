import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { StudentRepository } from '../../domain/student.repository';
import { Student } from '../../domain/student';
import { StudentId } from '../../domain/student-id';
import { StudentName } from '../../domain/student-name';
import { StudentEmail } from '../../domain/student-email';
import { StudentCreateAt } from '../../domain/student-create-at';

@Injectable()
export class StudentPersistService {
  constructor(private repository: StudentRepository, private eventBus: EventBus) {}

  public async execute(
    id: StudentId,
    name: StudentName,
    email: StudentEmail,
    createAt: StudentCreateAt,
  ): Promise<void> {
    let student = await this.repository.findById(id);
    if (!student) {
      student = Student.create(id, name, email, createAt);
    } else {
      student.update(name, email, createAt);
    }
    await this.repository.persist(student);
    this.eventBus.publishAll(student.pullDomainEvents());
  }
}
