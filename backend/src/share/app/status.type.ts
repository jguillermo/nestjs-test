import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Status')
export class StatusType {
  @Field()
  status: string;
}
