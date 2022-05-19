import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { StatusType } from '../../../share/app/status.type';

@ObjectType('Course')
export class CourseType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field()
  enrollments: number;
}

export const ResultCoursePersist = createUnionType({
  name: 'ResultCoursePersist',
  types: () => [CourseType, StatusType],
  resolveType(value) {
    if (value.status) {
      return StatusType;
    }
    return CourseType;
  },
});
