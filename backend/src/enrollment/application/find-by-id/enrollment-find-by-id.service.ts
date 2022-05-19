import { Injectable } from '@nestjs/common';
import { EnrollmentRepository } from '../../domain/enrollment.repository';
import { EnrollmentResponse } from '../enrollment.response';
import { EnrollmentId } from '../../domain/enrollment-id';

@Injectable()
export class EnrollmentFindByIdService {
  constructor(private repository: EnrollmentRepository) {}

  public async execute(id: EnrollmentId): Promise<EnrollmentResponse | null> {
    const enrollment = await this.repository.findById(id);
    if (!enrollment) {
      return null;
    }
    return EnrollmentResponse.fromAggregate(enrollment);
  }
}
