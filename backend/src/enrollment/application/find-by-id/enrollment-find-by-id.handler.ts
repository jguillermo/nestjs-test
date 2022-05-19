import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { EnrollmentResponse } from '../enrollment.response';
import { EnrollmentId } from '../../domain/enrollment-id';
import { EnrollmentFindByIdDto } from './enrollment-find-by-id.dto';
import { EnrollmentFindByIdService } from './enrollment-find-by-id.service';

@QueryHandler(EnrollmentFindByIdDto)
export class EnrollmentFindByIdHandler implements IQueryHandler<EnrollmentFindByIdDto> {
  constructor(private service: EnrollmentFindByIdService) {}

  async execute(dto: EnrollmentFindByIdDto): Promise<EnrollmentResponse> {
    const id = new EnrollmentId(dto.id);

    return await this.service.execute(id);
  }
}
