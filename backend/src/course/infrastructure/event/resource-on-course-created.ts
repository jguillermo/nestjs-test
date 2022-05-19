import { CommandBus, EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { CourseCreatedEvent } from '../../domain/course-created.event';
import { StudentListDto } from '../../../share/application/dto/student-list.dto';
import { ListCourseResponse } from '../../application/list-course.response';
import { EnrollmentPersistDto } from '../../../share/application/dto/enrollment-persist.dto';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';

@EventsHandler(CourseCreatedEvent)
export class ResourceOnCourseCreated implements IEventHandler<CourseCreatedEvent> {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async handle(event: CourseCreatedEvent) {
    const students: ListCourseResponse = await this.queryBus.execute(new StudentListDto());
    for (const item of students.list) {
      const dto = new EnrollmentPersistDto();
      dto.course = event.id;
      dto.student = item.id;
      dto.id = UUIDTypeImp.fromValue(`${event.id}-${item.id}`);
      await this.commandBus.execute(dto);
    }
  }
}
