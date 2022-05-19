import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultCoursePersist, CourseType } from './course.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseStatus } from '../../../share/application/applicationResponse';
import { StatusType } from '../../../share/app/status.type';
import { CourseFindByIdDto } from '../../application/find-by-id/course-find-by-id.dto';
import { CoursePersistDto } from '../../application/persist/course-persist.dto';
import { CourseDeleteDto } from '../../application/delete/course-delete.dto';
import { CourseListDto } from '../../application/list/course-list.dto';
import { CourseResponse } from '../../application/course.response';
import { ListCourseResponse } from '../../application/list-course.response';

@Resolver(() => CourseType)
export class CourseResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [CourseType], { name: 'courseList' })
  async list(@Args() args: CourseListDto): Promise<CourseResponse[]> {
    const data: ListCourseResponse = await this.queryBus.execute(args);
    return data.list;
  }

  @Query(() => CourseType, { name: 'course', nullable: true })
  async aggregate(@Args() args: CourseFindByIdDto): Promise<CourseResponse | null> {
    return await this.queryBus.execute(args);
  }

  @Mutation(() => ResultCoursePersist, { name: 'coursePersist' })
  async persist(@Args() args: CoursePersistDto) {
    await this.commandBus.execute(args);
    return args.showEntity ? await this.queryBus.execute(new CourseFindByIdDto(args.id)) : ResponseStatus.ok();
  }

  @Mutation(() => StatusType, { name: 'courseDelete' })
  async delete(@Args() args: CourseDeleteDto): Promise<ResponseStatus> {
    await this.commandBus.execute(args);
    return ResponseStatus.ok();
  }
}
