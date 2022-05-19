import { faker } from '@faker-js/faker';
import { Student } from '../../../src/student/domain/student';
import { StudentId } from '../../../src/student/domain/student-id';
import { StudentName } from '../../../src/student/domain/student-name';
import { StudentEmail } from '../../../src/student/domain/student-email';
import { StudentCreateAt } from '../../../src/student/domain/student-create-at';

export interface StudentDataInterface {
  id?: string;
  name?: string;
  email?: string;
  createAt?: Date;
}

export class StudentIdMother {
  static create(value?: string): StudentId {
    const id = value ? value : faker.datatype.uuid();
    return new StudentId(id);
  }
}

export class StudentNameMother {
  static create(value?: string): StudentName {
    const course = value ? value : faker.name.firstName();
    return new StudentName(course);
  }
}

export class StudentEmailMother {
  static create(value?: string): StudentEmail {
    const student = value ? value : faker.internet.email();
    return new StudentEmail(student);
  }
}

export class StudentCreateAtMother {
  static create(value?: Date): StudentCreateAt {
    const startAt = value ? value : faker.datatype.datetime().toISOString();
    return new StudentCreateAt(startAt);
  }
}

export class StudentMother {
  static create(data?: StudentDataInterface): Student {
    return new Student(
      StudentIdMother.create(data?.id),
      StudentNameMother.create(data?.id),
      StudentEmailMother.create(data?.email),
      StudentCreateAtMother.create(data?.createAt),
    );
  }
}
