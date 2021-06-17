import { PermissionTag } from '../enum/permission-tag.enum';
import {
  IsNotEmpty,
  IsString,
  ArrayUnique,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @ArrayUnique()
  @IsArray()
  @IsEnum(PermissionTag, { each: true })
  @ApiProperty()
  public readonly permissions: PermissionTag[];
}
