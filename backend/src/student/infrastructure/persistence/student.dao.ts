import { Student } from '../../domain/student';
import { StudentId } from '../../domain/student-id';
import { StudentName } from '../../domain/student-name';
import { StudentEmail } from '../../domain/student-email';
import { StudentCreateAt } from '../../domain/student-create-at';
import { ItemDto } from '../../../share/infrastructure/firestore/firestore.service';

export class StudentDao {
  id: string;
  name: string;
  email: string;
  createAt: Date;

  static fromAggregate(student: Student): StudentDao {
    const dao = new StudentDao();
    dao.id = student.id.value;
    dao.name = student.name.value;
    dao.email = student.email.value;
    dao.createAt = student.createAt.value;
    return dao;
  }

  static fromItem(item: ItemDto): StudentDao {
    const dao = new StudentDao();
    //item.data.id = item.id
    dao.id = item.data.id;
    dao.name = item.data.name;
    dao.email = item.data.email;
    dao.createAt = item.data.createAt.toDate();
    return dao;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createAt: this.createAt,
    };
  }

  toAggregate(): Student {
    return new Student(
      new StudentId(this.id),
      new StudentName(this.name),
      new StudentEmail(this.email),
      new StudentCreateAt(this.createAt),
    );
  }
}
