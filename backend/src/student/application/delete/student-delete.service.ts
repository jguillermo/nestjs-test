import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { StudentRepository } from '../../domain/student.repository';
import { StudentId } from '../../domain/student-id';

@Injectable()
export class StudentDeleteService {
  constructor(private repository: StudentRepository, private eventBus: EventBus) {}

  public async execute(id: StudentId): Promise<void> {
    const student = await this.repository.findById(id);
    if (student) {
      student.delete();
      await this.repository.deleteById(student.id);
      this.eventBus.publishAll(student.pullDomainEvents());
    }
  }
}
