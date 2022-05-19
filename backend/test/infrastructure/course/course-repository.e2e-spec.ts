import { CourseRepository } from '../../../src/course/domain/course.repository';
import { CourseMother } from './course-object-mother';
import { TestingE2eModule } from '../testing-e2e-module';

describe('CourseRepository', () => {
  let repository: CourseRepository;
  beforeEach(async () => {
    ({ courseRepository: repository } = await TestingE2eModule.create());
  });
  it('persist', async () => {
    const course = CourseMother.create();
    await repository.persist(course);
    const courseDb = await repository.findById(course.id);
    expect(courseDb.id).toEqual(course.id);
    expect(courseDb.name).toEqual(course.name);
  });
});
