import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRo } from 'src/users/dto/user.ro';

export class ReviewRo {
  @ApiProperty()
  @Expose()
  public readonly score: number;

  @ApiProperty()
  @Expose()
  public readonly text: string;

  @Type(() => UserRo)
  @ApiProperty()
  @Expose()
  public readonly reviewer: UserRo;
}
