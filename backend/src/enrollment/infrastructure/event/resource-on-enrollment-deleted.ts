import { CommandBus, EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { EnrollmentDeletedEvent } from '../../domain/enrollment-deleted.event';
import { UpdateCourseEnrollment } from './update-course-enrollment';

@EventsHandler(EnrollmentDeletedEvent)
export class ResourceOnEnrollmentDeleted
  extends UpdateCourseEnrollment
  implements IEventHandler<EnrollmentDeletedEvent>
{
  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    super(commandBus, queryBus);
  }

  async handle(event: EnrollmentDeletedEvent) {
    await this.update(event.course);
  }
}
