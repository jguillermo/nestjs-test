import { validate } from 'class-validator';
import { StudentPersistDto } from './student-persist.dto';

describe('StudentPersistDto', () => {
  describe('ok', () => {
    it('all correct', async () => {
      const dto = new StudentPersistDto();
      dto.id = 'e42ce453-ca22-5311-914d-76b8c4461e2b';
      dto.name = 'name';
      dto.email = 'email';
      dto.createAt = '2018-03-23';
      const errors = await validate(dto);
      expect(errors.length).toEqual(0);
    });
  });
  describe('error', () => {
    it('params null', async () => {
      const dto = new StudentPersistDto();
      const errors = await validate(dto);
      expect(errors.length).toEqual(4);
      //console.log(errors);
    });
  });
});
