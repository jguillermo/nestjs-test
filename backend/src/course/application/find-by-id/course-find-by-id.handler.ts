import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CourseResponse } from '../course.response';
import { CourseId } from '../../domain/course-id';
import { CourseFindByIdDto } from './course-find-by-id.dto';
import { CourseFindByIdService } from './course-find-by-id.service';

@QueryHandler(CourseFindByIdDto)
export class CourseFindByIdHandler implements IQueryHandler<CourseFindByIdDto> {
  constructor(private service: CourseFindByIdService) {}

  async execute(dto: CourseFindByIdDto): Promise<CourseResponse> {
    const id = new CourseId(dto.id);

    return await this.service.execute(id);
  }
}
