import { DateType } from 'base-ddd';

export class CourseStartAt extends DateType {
  isValid(): boolean {
    if (this.isNull) {
      throw new Error('is required.');
    }
    return true;
  }
}
