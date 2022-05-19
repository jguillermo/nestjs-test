import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { EnrollmentUpdatedEvent } from '../../domain/enrollment-updated.event';

@EventsHandler(EnrollmentUpdatedEvent)
export class ResourceOnEnrollmentUpdated implements IEventHandler<EnrollmentUpdatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: EnrollmentUpdatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
