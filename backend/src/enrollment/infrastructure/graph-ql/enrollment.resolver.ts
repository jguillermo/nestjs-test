import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ResultEnrollmentPersist, EnrollmentType } from './enrollment.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseStatus } from '../../../share/application/applicationResponse';
import { StatusType } from '../../../share/app/status.type';
import { EnrollmentFindByIdDto } from '../../application/find-by-id/enrollment-find-by-id.dto';
import { EnrollmentPersistDto } from '../../../share/application/dto/enrollment-persist.dto';
import { EnrollmentDeleteDto } from '../../application/delete/enrollment-delete.dto';
import { EnrollmentListDto } from '../../application/list/enrollment-list.dto';
import { EnrollmentResponse } from '../../application/enrollment.response';
import { ListEnrollmentResponse } from '../../application/list-enrollment.response';
import { StudentFindByIdDto } from '../../../share/application/dto/student-find-by-id.dto';

@Resolver(() => EnrollmentType)
export class EnrollmentResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [EnrollmentType], { name: 'enrollmentList' })
  async list(@Args() args: EnrollmentListDto): Promise<EnrollmentResponse[]> {
    const data: ListEnrollmentResponse = await this.queryBus.execute(args);
    return data.list;
  }

  @ResolveField()
  async student(@Parent() client: EnrollmentType) {
    return this.queryBus.execute(new StudentFindByIdDto(client.studentId));
  }

  @Query(() => EnrollmentType, { name: 'enrollment', nullable: true })
  async aggregate(@Args() args: EnrollmentFindByIdDto): Promise<EnrollmentResponse | null> {
    return await this.queryBus.execute(args);
  }

  @Mutation(() => ResultEnrollmentPersist, { name: 'enrollmentPersist' })
  async persist(@Args() args: EnrollmentPersistDto) {
    await this.commandBus.execute(args);
    return args.showEntity ? await this.queryBus.execute(new EnrollmentFindByIdDto(args.id)) : ResponseStatus.ok();
  }

  @Mutation(() => StatusType, { name: 'enrollmentDelete' })
  async delete(@Args() args: EnrollmentDeleteDto): Promise<ResponseStatus> {
    await this.commandBus.execute(args);
    return ResponseStatus.ok();
  }
}
