import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { StudentDeletedEvent } from '../../domain/student-deleted.event';

@EventsHandler(StudentDeletedEvent)
export class ResourceOnStudentDeleted implements IEventHandler<StudentDeletedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: StudentDeletedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
