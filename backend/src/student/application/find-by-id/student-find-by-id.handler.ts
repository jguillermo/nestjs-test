import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { StudentResponse } from '../student.response';
import { StudentId } from '../../domain/student-id';
import { StudentFindByIdDto } from '../../../share/application/dto/student-find-by-id.dto';
import { StudentFindByIdService } from './student-find-by-id.service';

@QueryHandler(StudentFindByIdDto)
export class StudentFindByIdHandler implements IQueryHandler<StudentFindByIdDto> {
  constructor(private service: StudentFindByIdService) {}

  async execute(dto: StudentFindByIdDto): Promise<StudentResponse> {
    const id = new StudentId(dto.id);

    return await this.service.execute(id);
  }
}
