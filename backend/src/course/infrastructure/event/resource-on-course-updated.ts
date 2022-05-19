import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CourseUpdatedEvent } from '../../domain/course-updated.event';

@EventsHandler(CourseUpdatedEvent)
export class ResourceOnCourseUpdated implements IEventHandler<CourseUpdatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: CourseUpdatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
