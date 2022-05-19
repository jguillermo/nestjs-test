import { EventBase } from 'base-ddd';

export class EnrollmentDeletedEvent extends EventBase {
  constructor(private _id: string, private _course: string, private _student: string) {
    super();
  }

  get id(): string {
    return this._id;
  }

  get course(): string {
    return this._course;
  }

  get student(): string {
    return this._student;
  }

  eventName(): string {
    return 'enrollment.deleted';
  }
}
