import { Injectable } from '@nestjs/common';
import { EnrollmentRepository } from '../../domain/enrollment.repository';
import { EnrollmentResponse } from '../enrollment.response';
import { ListEnrollmentResponse } from '../list-enrollment.response';
import { FilterOpStr, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';

@Injectable()
export class EnrollmentListService {
  constructor(private repository: EnrollmentRepository) {}

  public async execute(
    id: UUIDTypeImp,
    course: UUIDTypeImp,
    student: UUIDTypeImp,
    paginator: PaginatorTypeImp,
    order: OrderTypeImp,
  ): Promise<ListEnrollmentResponse> {
    const listEnrollment = await this.repository.findAll(
      [
        {
          field: 'id',
          opStr: FilterOpStr.EQUAL_TO,
          value: id.value,
        },
        {
          field: 'course',
          opStr: FilterOpStr.EQUAL_TO,
          value: course.value,
        },
        {
          field: 'student',
          opStr: FilterOpStr.EQUAL_TO,
          value: student.value,
        },
      ],
      paginator,
      order,
    );
    return new ListEnrollmentResponse(
      listEnrollment.map((enrollment) => {
        return EnrollmentResponse.fromAggregate(enrollment);
      }),
    );
  }
}
