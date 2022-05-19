import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CourseDeleteService } from './course-delete.service';
import { CourseDeleteDto } from './course-delete.dto';
import { CourseId } from '../../domain/course-id';

@CommandHandler(CourseDeleteDto)
export class CourseDeleteHandler implements ICommandHandler<CourseDeleteDto> {
  constructor(private service: CourseDeleteService) {}

  async execute(dto: CourseDeleteDto): Promise<void> {
    const id = new CourseId(dto.id);

    await this.service.execute(id);
  }
}
