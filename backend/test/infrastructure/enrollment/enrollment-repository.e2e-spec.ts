import { EnrollmentRepository } from '../../../src/enrollment/domain/enrollment.repository';
import { EnrollmentMother } from './enrollment-object-mother';
import { TestingE2eModule } from '../testing-e2e-module';

describe('EnrollmentRepository', () => {
  let repository: EnrollmentRepository;
  beforeEach(async () => {
    ({ enrollmentRepository: repository } = await TestingE2eModule.create());
  });
  it('persist', async () => {
    const enrollment = EnrollmentMother.create();
    await repository.persist(enrollment);
    const enrollmentDb = await repository.findById(enrollment.id);
    expect(enrollmentDb.id).toEqual(enrollment.id);
    expect(enrollmentDb.student).toEqual(enrollment.student);
    expect(enrollmentDb.course).toEqual(enrollment.course);
  });
});
