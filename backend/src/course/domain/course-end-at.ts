import { DateType } from 'base-ddd';

export class CourseEndAt extends DateType {
  isValid(): boolean {
    if (this.isNull) {
      throw new Error('is required.');
    }
    return true;
  }
}
