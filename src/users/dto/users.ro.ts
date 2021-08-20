import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { UserRo } from './user.ro';

export class UsersRo {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserRo)
  @ApiProperty({ type: [UserRo] })
  public readonly users: UserRo[];
}
