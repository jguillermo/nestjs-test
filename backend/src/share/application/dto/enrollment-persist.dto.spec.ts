import { validate } from 'class-validator';
import { EnrollmentPersistDto } from './enrollment-persist.dto';

describe('EnrollmentPersistDto', () => {
  describe('ok', () => {
    it('all correct', async () => {
      const dto = new EnrollmentPersistDto();
      dto.id = 'e42ce453-ca22-5311-914d-76b8c4461e2b';
      dto.course = 'e42ce453-ca22-5311-914d-76b8c4461e2b';
      dto.student = 'e42ce453-ca22-5311-914d-76b8c4461e2b';
      const errors = await validate(dto);
      expect(errors.length).toEqual(0);
    });
  });
  describe('error', () => {
    it('params null', async () => {
      const dto = new EnrollmentPersistDto();
      const errors = await validate(dto);
      expect(errors.length).toEqual(3);
      //console.log(errors);
    });
  });
});
