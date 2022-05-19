import { Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { CourseId } from '../../domain/course-id';

@ArgsType()
export class CourseDeleteDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [CourseId])
  @Field()
  id: string;
}
