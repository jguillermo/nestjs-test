import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, Validate } from 'class-validator';
import { DomainValidator, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { BaseDto, OrderDto, PaginatorDto } from '../../../share/application/base.dto';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';

@ArgsType()
export class EnrollmentListDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [UUIDTypeImp])
  @Field({ nullable: true })
  id?: string;

  @Validate(DomainValidator, [UUIDTypeImp])
  @Field({ nullable: true })
  course?: string;

  @Validate(DomainValidator, [UUIDTypeImp])
  @Field({ nullable: true })
  student?: string;

  @IsOptional()
  @Validate(DomainValidator, [PaginatorTypeImp])
  @Field(() => PaginatorDto, { nullable: true })
  paginator?: PaginatorDto;

  @IsOptional()
  @Validate(DomainValidator, [OrderTypeImp])
  @Field(() => OrderDto, { nullable: true })
  order?: OrderDto;

  static fromCourse(course: string): EnrollmentListDto {
    const dto = new EnrollmentListDto();
    dto.course = course;
    return dto;
  }
}
