import { ArgsType, Field } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../base.dto';
import { StudentId } from '../../../student/domain/student-id';

@ArgsType()
export class StudentFindByIdDto extends BaseDto {
  constructor(id: string) {
    super();
    this.id = id;
  }

  @Validate(DomainValidator, [StudentId])
  @Field()
  id: string;
}
