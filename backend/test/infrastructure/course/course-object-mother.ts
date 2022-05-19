import { faker } from '@faker-js/faker';
import { Course } from '../../../src/course/domain/course';
import { CourseId } from '../../../src/course/domain/course-id';
import { CourseName } from '../../../src/course/domain/course-name';
import { CourseStartAt } from '../../../src/course/domain/course-start-at';
import { CourseEndAt } from '../../../src/course/domain/course-end-at';
import { CourseEnrollments } from '../../../src/course/domain/course-enrollments';

export interface CourseDataInterface {
  id?: string;
  name?: string;
  startAt?: Date;
  endAt?: Date;
  enrollments?: number;
}

export class CourseIdMother {
  static create(value?: string): CourseId {
    const id = value ? value : faker.datatype.uuid();
    return new CourseId(id);
  }
}

export class CourseNameMother {
  static create(value?: string): CourseName {
    const name = value ? value : faker.name.firstName();
    return new CourseName(name);
  }
}

export class CourseStartAtMother {
  static create(value?: Date): CourseStartAt {
    const startAt = value ? value : faker.datatype.datetime().toISOString();
    return new CourseStartAt(startAt);
  }
}

export class CourseEndAtMother {
  static create(value?: Date): CourseEndAt {
    const endAt = value ? value : faker.datatype.datetime().toISOString();
    return new CourseEndAt(endAt);
  }
}

export class CourseEnrollmentsMother {
  static create(value?: number): CourseEnrollments {
    const enrollments = value ? value : faker.datatype.number();
    return new CourseEnrollments(enrollments);
  }
}

export class CourseMother {
  static create(data?: CourseDataInterface): Course {
    return new Course(
      CourseIdMother.create(data?.id),
      CourseNameMother.create(data?.name),
      CourseStartAtMother.create(data?.startAt),
      CourseEndAtMother.create(data?.endAt),
      CourseEnrollmentsMother.create(data?.enrollments),
    );
  }
}
