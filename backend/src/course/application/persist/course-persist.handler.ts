import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoursePersistService } from './course-persist.service';
import { CoursePersistDto } from './course-persist.dto';
import { CourseId } from '../../domain/course-id';
import { CourseName } from '../../domain/course-name';
import { CourseStartAt } from '../../domain/course-start-at';
import { CourseEndAt } from '../../domain/course-end-at';

@CommandHandler(CoursePersistDto)
export class CoursePersistHandler implements ICommandHandler<CoursePersistDto> {
  constructor(private service: CoursePersistService) {}

  async execute(dto: CoursePersistDto): Promise<void> {
    const id = new CourseId(dto.id);
    const name = new CourseName(dto.name);
    const startAt = new CourseStartAt(dto.startAt);
    const endAt = new CourseEndAt(dto.endAt);
    await this.service.execute(id, name, startAt, endAt);
  }
}
