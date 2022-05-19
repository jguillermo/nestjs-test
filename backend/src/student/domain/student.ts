import { AggregateRoot } from 'base-ddd';
import { StudentId } from './student-id';
import { StudentName } from './student-name';
import { StudentEmail } from './student-email';
import { StudentCreateAt } from './student-create-at';
import { StudentCreatedEvent } from './student-created.event';
import { StudentUpdatedEvent } from './student-updated.event';
import { StudentDeletedEvent } from './student-deleted.event';

export class Student extends AggregateRoot {
  constructor(
    private _id: StudentId,
    private _name: StudentName,
    private _email: StudentEmail,
    private _createAt: StudentCreateAt,
  ) {
    super();
  }

  static create(id: StudentId, name: StudentName, email: StudentEmail, createAt: StudentCreateAt): Student {
    const student = new Student(id, name, email, createAt);
    student.record(new StudentCreatedEvent(id.value, name.value, email.value, createAt.toString));
    return student;
  }

  get id(): StudentId {
    return this._id;
  }

  get name(): StudentName {
    return this._name;
  }

  get email(): StudentEmail {
    return this._email;
  }

  get createAt(): StudentCreateAt {
    return this._createAt;
  }

  update(name: StudentName, email: StudentEmail, createAt: StudentCreateAt): void {
    this._name = name;
    this._email = email;
    this._createAt = createAt;
    this.record(new StudentUpdatedEvent(this.id.value, this.name.value, this.email.value, this.createAt.toString));
  }

  delete(): void {
    this.record(new StudentDeletedEvent(this.id.value, this.name.value, this.email.value, this.createAt.toString));
  }
}
