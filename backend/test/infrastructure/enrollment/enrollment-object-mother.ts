import { faker } from '@faker-js/faker';
import { Enrollment } from '../../../src/enrollment/domain/enrollment';
import { EnrollmentId } from '../../../src/enrollment/domain/enrollment-id';
import { EnrollmentStudent } from '../../../src/enrollment/domain/enrollment-student';
import { EnrollmentCourse } from '../../../src/enrollment/domain/enrollment-course';

export interface EnrollmentDataInterface {
  id?: string;
  course?: string;
  student?: string;
}

export class EnrollmentIdMother {
  static create(value?: string): EnrollmentId {
    const id = value ? value : faker.datatype.uuid();
    return new EnrollmentId(id);
  }
}

export class EnrollmentStudentMother {
  static create(value?: string): EnrollmentStudent {
    const id = value ? value : faker.datatype.uuid();
    return new EnrollmentStudent(id);
  }
}

export class EnrollmentCourseMother {
  static create(value?: string): EnrollmentCourse {
    const id = value ? value : faker.datatype.uuid();
    return new EnrollmentCourse(id);
  }
}

export class EnrollmentMother {
  static create(data?: EnrollmentDataInterface): Enrollment {
    return new Enrollment(
      EnrollmentIdMother.create(data?.id),
      EnrollmentCourseMother.create(data?.course),
      EnrollmentStudentMother.create(data?.student),
    );
  }
}
