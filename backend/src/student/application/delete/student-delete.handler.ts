import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StudentDeleteService } from './student-delete.service';
import { StudentDeleteDto } from './student-delete.dto';
import { StudentId } from '../../domain/student-id';

@CommandHandler(StudentDeleteDto)
export class StudentDeleteHandler implements ICommandHandler<StudentDeleteDto> {
  constructor(private service: StudentDeleteService) {}

  async execute(dto: StudentDeleteDto): Promise<void> {
    const id = new StudentId(dto.id);

    await this.service.execute(id);
  }
}
