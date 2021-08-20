import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { RoleRo } from './role.ro';

export class RolesRo {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleRo)
  @ApiProperty({ type: [RoleRo] })
  @Expose()
  public roles: RoleRo[];
}
