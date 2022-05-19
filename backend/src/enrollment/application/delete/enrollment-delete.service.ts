import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EnrollmentRepository } from '../../domain/enrollment.repository';
import { EnrollmentId } from '../../domain/enrollment-id';

@Injectable()
export class EnrollmentDeleteService {
  constructor(private repository: EnrollmentRepository, private eventBus: EventBus) {}

  public async execute(id: EnrollmentId): Promise<void> {
    const enrollment = await this.repository.findById(id);
    if (enrollment) {
      enrollment.delete();
      await this.repository.deleteById(enrollment.id);
      this.eventBus.publishAll(enrollment.pullDomainEvents());
    }
  }
}
