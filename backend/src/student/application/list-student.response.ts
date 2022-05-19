import { StudentResponse } from './student.response';

export class ListStudentResponse {
  public list: StudentResponse[];

  constructor(list: StudentResponse[]) {
    this.list = list;
  }
}
