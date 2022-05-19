import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CourseDeletedEvent } from '../../domain/course-deleted.event';

@EventsHandler(CourseDeletedEvent)
export class ResourceOnCourseDeleted implements IEventHandler<CourseDeletedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: CourseDeletedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
