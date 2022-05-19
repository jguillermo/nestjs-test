import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { ListEnrollmentResponse } from '../list-enrollment.response';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { EnrollmentListDto } from './enrollment-list.dto';
import { EnrollmentListService } from './enrollment-list.service';

@QueryHandler(EnrollmentListDto)
export class EnrollmentListHandler implements IQueryHandler<EnrollmentListDto> {
  constructor(private service: EnrollmentListService) {}

  async execute(dto: EnrollmentListDto): Promise<ListEnrollmentResponse> {
    const id = new UUIDTypeImp(dto.id);
    const course = new UUIDTypeImp(dto.course);
    const student = new UUIDTypeImp(dto.student);
    const paginator = PaginatorTypeImp.create(dto.paginator?.page, dto.paginator?.perPage);
    const order = OrderTypeImp.create(dto.order?.field, dto.order?.direction);

    return await this.service.execute(id, course, student, paginator, order);
  }
}
