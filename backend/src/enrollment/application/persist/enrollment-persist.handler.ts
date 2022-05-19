import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EnrollmentPersistService } from './enrollment-persist.service';
import { EnrollmentPersistDto } from '../../../share/application/dto/enrollment-persist.dto';
import { EnrollmentId } from '../../domain/enrollment-id';
import { EnrollmentCourse } from '../../domain/enrollment-course';
import { EnrollmentStudent } from '../../domain/enrollment-student';

@CommandHandler(EnrollmentPersistDto)
export class EnrollmentPersistHandler implements ICommandHandler<EnrollmentPersistDto> {
  constructor(private service: EnrollmentPersistService) {}

  async execute(dto: EnrollmentPersistDto): Promise<void> {
    const id = new EnrollmentId(dto.id);
    const course = new EnrollmentCourse(dto.course);
    const student = new EnrollmentStudent(dto.student);

    await this.service.execute(id, course, student);
  }
}
