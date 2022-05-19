import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../domain/course.repository';
import { CourseResponse } from '../course.response';
import { ListCourseResponse } from '../list-course.response';
import { FilterOpStr, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { DateTypeImp } from 'base-ddd/dist/ValueObject/Implement/DateTypeImp';
import { NumberTypeImp } from 'base-ddd/dist/ValueObject/Implement/NumberTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';

@Injectable()
export class CourseListService {
  constructor(private repository: CourseRepository) {}

  public async execute(
    id: UUIDTypeImp,
    name: StringTypeImp,
    startAt: DateTypeImp,
    endAt: DateTypeImp,
    enrollments: NumberTypeImp,
    paginator: PaginatorTypeImp,
    order: OrderTypeImp,
  ): Promise<ListCourseResponse> {
    const listCourse = await this.repository.findAll(
      [
        {
          field: 'id',
          opStr: FilterOpStr.EQUAL_TO,
          value: id.value,
        },
        {
          field: 'name',
          opStr: FilterOpStr.EQUAL_TO,
          value: name.value,
        },
        {
          field: 'startAt',
          opStr: FilterOpStr.EQUAL_TO,
          value: startAt.toString,
        },
        {
          field: 'endAt',
          opStr: FilterOpStr.EQUAL_TO,
          value: endAt.toString,
        },
        {
          field: 'enrollments',
          opStr: FilterOpStr.EQUAL_TO,
          value: enrollments.toString,
        },
      ],
      paginator,
      order,
    );
    return new ListCourseResponse(
      listCourse.map((course) => {
        return CourseResponse.fromAggregate(course);
      }),
    );
  }
}
