import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EnrollmentDeleteService } from './enrollment-delete.service';
import { EnrollmentDeleteDto } from './enrollment-delete.dto';
import { EnrollmentId } from '../../domain/enrollment-id';

@CommandHandler(EnrollmentDeleteDto)
export class EnrollmentDeleteHandler implements ICommandHandler<EnrollmentDeleteDto> {
  constructor(private service: EnrollmentDeleteService) {}

  async execute(dto: EnrollmentDeleteDto): Promise<void> {
    const id = new EnrollmentId(dto.id);

    await this.service.execute(id);
  }
}
