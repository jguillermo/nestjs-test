import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { StudentUpdatedEvent } from '../../domain/student-updated.event';

@EventsHandler(StudentUpdatedEvent)
export class ResourceOnStudentUpdated implements IEventHandler<StudentUpdatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: StudentUpdatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
