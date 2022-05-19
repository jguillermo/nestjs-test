import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { StudentCreatedEvent } from '../../domain/student-created.event';

@EventsHandler(StudentCreatedEvent)
export class ResourceOnStudentCreated implements IEventHandler<StudentCreatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: StudentCreatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
