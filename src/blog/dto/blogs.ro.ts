import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BlogRo } from './blog.ro';

export class BlogsRo {
  @Type(() => BlogRo)
  @ApiProperty({ type: [BlogRo] })
  @Expose()
  public blogs: BlogRo[];
}
