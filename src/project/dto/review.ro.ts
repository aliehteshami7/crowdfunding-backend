import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserRo } from 'src/users/dto/user.ro';

export class ReviewRo {
  @ApiProperty()
  public readonly score: number;

  @ApiProperty()
  public readonly text: string;

  @Type(() => UserRo)
  @ApiProperty()
  public readonly reviewer: UserRo;
}
