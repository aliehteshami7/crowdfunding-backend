import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ProjectRo } from './project.ro';

export class ProjectsRo {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectRo)
  @ApiProperty()
  @Expose()
  public projects: ProjectRo[];
}
