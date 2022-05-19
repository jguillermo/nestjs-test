import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { ListCourseResponse } from '../list-course.response';
import { DateTypeImp } from 'base-ddd/dist/ValueObject/Implement/DateTypeImp';
import { NumberTypeImp } from 'base-ddd/dist/ValueObject/Implement/NumberTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { CourseListDto } from './course-list.dto';
import { CourseListService } from './course-list.service';

@QueryHandler(CourseListDto)
export class CourseListHandler implements IQueryHandler<CourseListDto> {
  constructor(private service: CourseListService) {}

  async execute(dto: CourseListDto): Promise<ListCourseResponse> {
    const id = new UUIDTypeImp(dto.id);
    const name = new StringTypeImp(dto.name);
    const startAt = new DateTypeImp(dto.startAt);
    const endAt = new DateTypeImp(dto.endAt);
    const enrollments = new NumberTypeImp(dto.enrollments);
    const paginator = PaginatorTypeImp.create(dto.paginator?.page, dto.paginator?.perPage);
    const order = OrderTypeImp.create(dto.order?.field, dto.order?.direction);

    return await this.service.execute(id, name, startAt, endAt, enrollments, paginator, order);
  }
}
