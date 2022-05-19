import { StringProcess } from './string-process';

export class DateProcess implements StringProcess {
  get regexp() {
    return /^Date\([\d]{4}\-[\d]{2}\-[\d]{2}\)$/;
  }

  process(data: string): any {
    return new Date(data.substring(5, 15));
  }
}
