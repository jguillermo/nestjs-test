import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { StatusType } from '../../app/status.type';

@ObjectType('Student')
export class StudentType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  createAt: Date;
}

export const ResultStudentPersist = createUnionType({
  name: 'ResultStudentPersist',
  types: () => [StudentType, StatusType],
  resolveType(value) {
    if (value.status) {
      return StatusType;
    }
    return StudentType;
  },
});
