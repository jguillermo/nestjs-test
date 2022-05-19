import { Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { StudentId } from '../../domain/student-id';

@ArgsType()
export class StudentDeleteDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [StudentId])
  @Field()
  id: string;
}
