import { BaseDto } from '../base.dto';

export class CourseUpdateEnrollmentDto extends BaseDto {
  constructor(private _id: string, private _enrollments: number) {
    super();
  }

  get id(): string {
    return this._id;
  }

  get enrollments(): number {
    return this._enrollments;
  }
}
