import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultStudentPersist, StudentType } from '../../../share/infrastructure/graph-ql/student.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseStatus } from '../../../share/application/applicationResponse';
import { StatusType } from '../../../share/app/status.type';
import { StudentFindByIdDto } from '../../../share/application/dto/student-find-by-id.dto';
import { StudentPersistDto } from '../../application/persist/student-persist.dto';
import { StudentDeleteDto } from '../../application/delete/student-delete.dto';
import { StudentListDto } from '../../../share/application/dto/student-list.dto';
import { StudentResponse } from '../../application/student.response';
import { ListStudentResponse } from '../../application/list-student.response';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [StudentType], { name: 'studentList' })
  async list(@Args() args: StudentListDto): Promise<StudentResponse[]> {
    const data: ListStudentResponse = await this.queryBus.execute(args);
    return data.list;
  }

  @Query(() => StudentType, { name: 'student', nullable: true })
  async aggregate(@Args() args: StudentFindByIdDto): Promise<StudentResponse | null> {
    return await this.queryBus.execute(args);
  }

  @Mutation(() => ResultStudentPersist, { name: 'studentPersist' })
  async persist(@Args() args: StudentPersistDto) {
    await this.commandBus.execute(args);
    return args.showEntity ? await this.queryBus.execute(new StudentFindByIdDto(args.id)) : ResponseStatus.ok();
  }

  @Mutation(() => StatusType, { name: 'studentDelete' })
  async delete(@Args() args: StudentDeleteDto): Promise<ResponseStatus> {
    await this.commandBus.execute(args);
    return ResponseStatus.ok();
  }
}
