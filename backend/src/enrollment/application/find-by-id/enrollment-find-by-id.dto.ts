import { ArgsType, Field } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { EnrollmentId } from '../../domain/enrollment-id';

@ArgsType()
export class EnrollmentFindByIdDto extends BaseDto {
  constructor(id: string) {
    super();
    this.id = id;
  }

  @Validate(DomainValidator, [EnrollmentId])
  @Field()
  id: string;
}
