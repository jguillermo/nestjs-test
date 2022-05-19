import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StudentPersistService } from './student-persist.service';
import { StudentPersistDto } from './student-persist.dto';
import { StudentId } from '../../domain/student-id';
import { StudentName } from '../../domain/student-name';
import { StudentEmail } from '../../domain/student-email';
import { StudentCreateAt } from '../../domain/student-create-at';

@CommandHandler(StudentPersistDto)
export class StudentPersistHandler implements ICommandHandler<StudentPersistDto> {
  constructor(private service: StudentPersistService) {}

  async execute(dto: StudentPersistDto): Promise<void> {
    const id = new StudentId(dto.id);
    const name = new StudentName(dto.name);
    const email = new StudentEmail(dto.email);
    const createAt = new StudentCreateAt(dto.createAt);

    await this.service.execute(id, name, email, createAt);
  }
}
