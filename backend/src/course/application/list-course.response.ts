import { CourseResponse } from './course.response';

export class ListCourseResponse {
  public list: CourseResponse[];

  constructor(list: CourseResponse[]) {
    this.list = list;
  }
}
