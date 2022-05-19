import { IsInt, IsOptional } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

export abstract class BaseDto {
  @IsOptional()
  public _transactionId: string;

  protected constructor(transactionId: string = null) {
    this.transactionId = transactionId;
  }

  set transactionId(value: string) {
    this._transactionId = value;
  }
}

@InputType('OrderInput')
export abstract class OrderDto {
  @IsOptional()
  @Field({ nullable: true })
  field?: string;

  @IsOptional()
  @Field({ nullable: true })
  direction?: string;
}

@InputType('PaginatorInput')
export abstract class PaginatorDto {
  @IsOptional()
  @IsInt()
  @Field(() => Int)
  page?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int)
  perPage?: number;
}
