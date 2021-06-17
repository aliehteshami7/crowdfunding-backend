import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PermissionTag } from '../enum/permission-tag.enum';

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  @Expose({ name: '_id' })
  @Expose({ name: 'id' })
  @Type(() => String)
  public readonly id: string;

  @IsString()
  public readonly name: string;

  @ArrayUnique()
  @IsArray()
  @IsEnum(PermissionTag, { each: true })
  @ApiProperty()
  public readonly permissions: PermissionTag[];
}
