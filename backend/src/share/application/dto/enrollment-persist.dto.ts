import { Validate, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../base.dto';
import { EnrollmentId } from '../../../enrollment/domain/enrollment-id';
import { EnrollmentCourse } from '../../../enrollment/domain/enrollment-course';
import { EnrollmentStudent } from '../../../enrollment/domain/enrollment-student';

@ArgsType()
export class EnrollmentPersistDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [EnrollmentId])
  @Field()
  id: string;

  @Validate(DomainValidator, [EnrollmentCourse])
  @Field()
  course: string;

  @Validate(DomainValidator, [EnrollmentStudent])
  @Field()
  student: string;

  @IsOptional()
  @Field({ nullable: true, defaultValue: false })
  showEntity?: boolean;
}
