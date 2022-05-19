import { EventBase } from 'base-ddd';

export class StudentDeletedEvent extends EventBase {
  constructor(private _id: string, private _name: string, private _email: string, private _createAt: string) {
    super();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get createAt(): string {
    return this._createAt;
  }

  eventName(): string {
    return 'student.deleted';
  }
}
