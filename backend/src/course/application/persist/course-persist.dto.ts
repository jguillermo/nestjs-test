import { Validate, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { CourseId } from '../../domain/course-id';
import { CourseName } from '../../domain/course-name';
import { CourseStartAt } from '../../domain/course-start-at';
import { CourseEndAt } from '../../domain/course-end-at';

@ArgsType()
export class CoursePersistDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [CourseId])
  @Field()
  id: string;

  @Validate(DomainValidator, [CourseName])
  @Field()
  name: string;

  @Validate(DomainValidator, [CourseStartAt])
  @Field()
  startAt: string;

  @Validate(DomainValidator, [CourseEndAt])
  @Field()
  endAt: string;

  @IsOptional()
  @Field({ nullable: true, defaultValue: false })
  showEntity?: boolean;
}
