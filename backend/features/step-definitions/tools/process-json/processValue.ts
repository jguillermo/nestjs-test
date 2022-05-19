import { StringProcess } from './string/string-process';
import { DateProcess } from './string/date-process';

export class ProcessValue {
  private static instance: ProcessValue;
  private stringProcesses: StringProcess[];

  private constructor() {
    this.stringProcesses = [new DateProcess()];
  }

  public static getInstance(): ProcessValue {
    if (!ProcessValue.instance) {
      ProcessValue.instance = new ProcessValue();
    }

    return ProcessValue.instance;
  }

  public process(data: any): any {
    for (const stringProces of this.stringProcesses) {
      if (typeof data === 'string' || data instanceof String) {
        if (data.search(stringProces.regexp) === 0) {
          data = stringProces.process(`${data}`);
        }
      }
    }
    return data;
  }
}
