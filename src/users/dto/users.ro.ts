import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserRo } from './user.ro';

export class UsersRo {
  @Type(() => UserRo)
  @ApiProperty({ type: [UserRo] })
  public readonly users: UserRo[];
}
