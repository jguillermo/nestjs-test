import { Validate, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { StudentId } from '../../domain/student-id';
import { StudentName } from '../../domain/student-name';
import { StudentEmail } from '../../domain/student-email';
import { StudentCreateAt } from '../../domain/student-create-at';

@ArgsType()
export class StudentPersistDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [StudentId])
  @Field()
  id: string;

  @Validate(DomainValidator, [StudentName])
  @Field()
  name: string;

  @Validate(DomainValidator, [StudentEmail])
  @Field()
  email: string;

  @Validate(DomainValidator, [StudentCreateAt])
  @Field()
  createAt: string;

  @IsOptional()
  @Field({ nullable: true, defaultValue: false })
  showEntity?: boolean;
}
