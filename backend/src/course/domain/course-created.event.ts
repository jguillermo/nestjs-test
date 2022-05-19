import { EventBase } from 'base-ddd';

export class CourseCreatedEvent extends EventBase {
  constructor(
    private _id: string,
    private _name: string,
    private _startAt: string,
    private _endAt: string,
    private _enrollments: number,
  ) {
    super();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get startAt(): string {
    return this._startAt;
  }

  get endAt(): string {
    return this._endAt;
  }

  get enrollments(): number {
    return this._enrollments;
  }

  eventName(): string {
    return 'course.created';
  }
}
