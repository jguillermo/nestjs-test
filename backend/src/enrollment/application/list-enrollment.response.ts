import { EnrollmentResponse } from './enrollment.response';

export class ListEnrollmentResponse {
  public list: EnrollmentResponse[];

  constructor(list: EnrollmentResponse[]) {
    this.list = list;
  }
}
