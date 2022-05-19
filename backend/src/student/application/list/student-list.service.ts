import { Injectable } from '@nestjs/common';
import { StudentRepository } from '../../domain/student.repository';
import { StudentResponse } from '../student.response';
import { ListStudentResponse } from '../list-student.response';
import { FilterOpStr, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { DateTypeImp } from 'base-ddd/dist/ValueObject/Implement/DateTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';

@Injectable()
export class StudentListService {
  constructor(private repository: StudentRepository) {}

  public async execute(
    id: UUIDTypeImp,
    name: StringTypeImp,
    email: StringTypeImp,
    createAt: DateTypeImp,
    paginator: PaginatorTypeImp,
    order: OrderTypeImp,
  ): Promise<ListStudentResponse> {
    const listStudent = await this.repository.findAll(
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
          field: 'email',
          opStr: FilterOpStr.EQUAL_TO,
          value: email.value,
        },
        {
          field: 'createAt',
          opStr: FilterOpStr.EQUAL_TO,
          value: createAt.toString,
        },
      ],
      paginator,
      order,
    );
    return new ListStudentResponse(
      listStudent.map((student) => {
        return StudentResponse.fromAggregate(student);
      }),
    );
  }
}
