import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ArrayUnique, IsArray, IsEnum, IsString } from 'class-validator';
import { PermissionTag } from '../enum/permission-tag.enum';

export class RoleRo {
  @IsString()
  @Expose({ name: '_id' })
  @Expose({ name: 'id' })
  @Type(() => String)
  @ApiProperty()
  public id: string;

  @IsString()
  @ApiProperty()
  @Expose()
  public name: string;

  @ArrayUnique()
  @IsArray()
  @IsEnum(PermissionTag, { each: true })
  @ApiProperty({
    type: 'array',
    items: {
      enum: Object.keys(PermissionTag),
    },
  })
  @Expose()
  public permissions: PermissionTag[];
}
