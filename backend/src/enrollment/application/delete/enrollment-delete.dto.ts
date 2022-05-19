import { Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { EnrollmentId } from '../../domain/enrollment-id';

@ArgsType()
export class EnrollmentDeleteDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [EnrollmentId])
  @Field()
  id: string;
}
