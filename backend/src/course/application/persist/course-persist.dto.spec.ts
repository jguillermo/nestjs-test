import { validate } from 'class-validator';
import { CoursePersistDto } from './course-persist.dto';

describe('CoursePersistDto', () => {
  describe('ok', () => {
    it('all correct', async () => {
      const dto = new CoursePersistDto();
      dto.id = 'e42ce453-ca22-5311-914d-76b8c4461e2b';
      dto.name = 'name';
      dto.startAt = '2018-03-23';
      dto.endAt = '2018-03-23';
      const errors = await validate(dto);
      expect(errors.length).toEqual(0);
    });
  });
  describe('error', () => {
    it('params null', async () => {
      const dto = new CoursePersistDto();
      const errors = await validate(dto);
      expect(errors.length).toEqual(4);
    });
  });
});
