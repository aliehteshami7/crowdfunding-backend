import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProjectRo } from './project.ro';

export class ProjectsRo {
  @Type(() => ProjectRo)
  @ApiProperty({ type: [ProjectRo] })
  @Expose()
  public projects: ProjectRo[];
}
