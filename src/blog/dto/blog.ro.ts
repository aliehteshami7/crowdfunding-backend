import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRo } from 'src/users/dto/user.ro';
import { BlogStateEnum } from '../enum/blog-state.enum';

export class BlogRo {
  @Expose({ name: '_id' })
  @Type(() => String)
  @ApiProperty()
  public id: string;

  @ApiProperty()
  @Expose()
  public readonly name: string;

  @Type(() => UserRo)
  @ApiProperty()
  @Expose()
  public readonly writer: UserRo;

  @ApiProperty()
  @Expose()
  public readonly blog: string;

  @ApiProperty()
  @Expose()
  public readonly mainPicture: string;

  @ApiProperty({
    enum: BlogStateEnum,
  })
  @Expose()
  public state: BlogStateEnum;
}
