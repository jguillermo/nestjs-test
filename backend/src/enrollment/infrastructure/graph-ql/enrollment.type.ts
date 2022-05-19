import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { StatusType } from '../../../share/app/status.type';
import { StudentType } from '../../../share/infrastructure/graph-ql/student.type';

@ObjectType('Enrollment')
export class EnrollmentType {
  @Field()
  id: string;

  @Field()
  course: string;

  @Field()
  studentId: string;

  @Field(() => StudentType)
  student: StudentType;
}

export const ResultEnrollmentPersist = createUnionType({
  name: 'ResultEnrollmentPersist',
  types: () => [EnrollmentType, StatusType],
  resolveType(value) {
    if (value.status) {
      return StatusType;
    }
    return EnrollmentType;
  },
});
