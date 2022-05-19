import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { ListStudentResponse } from '../list-student.response';
import { DateTypeImp } from 'base-ddd/dist/ValueObject/Implement/DateTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { StudentListDto } from '../../../share/application/dto/student-list.dto';
import { StudentListService } from './student-list.service';

@QueryHandler(StudentListDto)
export class StudentListHandler implements IQueryHandler<StudentListDto> {
  constructor(private service: StudentListService) {}

  async execute(dto: StudentListDto): Promise<ListStudentResponse> {
    const id = new UUIDTypeImp(dto.id);
    const name = new StringTypeImp(dto.name);
    const email = new StringTypeImp(dto.email);
    const createAt = new DateTypeImp(dto.createAt);
    const paginator = PaginatorTypeImp.create(dto.paginator?.page, dto.paginator?.perPage);
    const order = OrderTypeImp.create(dto.order?.field, dto.order?.direction);

    return await this.service.execute(id, name, email, createAt, paginator, order);
  }
}
