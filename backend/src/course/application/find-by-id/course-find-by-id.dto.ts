import { ArgsType, Field } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { CourseId } from '../../domain/course-id';

@ArgsType()
export class CourseFindByIdDto extends BaseDto {
  constructor(id: string) {
    super();
    this.id = id;
  }

  @Validate(DomainValidator, [CourseId])
  @Field()
  id: string;
}
