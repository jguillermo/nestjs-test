import { CommandBus, EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { EnrollmentCreatedEvent } from '../../domain/enrollment-created.event';
import { UpdateCourseEnrollment } from './update-course-enrollment';

@EventsHandler(EnrollmentCreatedEvent)
export class ResourceOnEnrollmentCreated
  extends UpdateCourseEnrollment
  implements IEventHandler<EnrollmentCreatedEvent>
{
  constructor(commandBus: CommandBus, queryBus: QueryBus) {
    super(commandBus, queryBus);
  }

  async handle(event: EnrollmentCreatedEvent) {
    await this.update(event.course);
  }
}
