import { StudentRepository } from '../../../src/student/domain/student.repository';
import { StudentMother } from './student-object-mother';
import { TestingE2eModule } from '../testing-e2e-module';

describe('StudentRepository', () => {
  let repository: StudentRepository;
  beforeEach(async () => {
    ({ studentRepository: repository } = await TestingE2eModule.create());
  });
  it('persist', async () => {
    const student = StudentMother.create();
    await repository.persist(student);
    const studentDb = await repository.findById(student.id);
    expect(studentDb.id).toEqual(student.id);
    expect(studentDb.name).toEqual(student.name);
    expect(studentDb.email).toEqual(student.email);
  });
});
