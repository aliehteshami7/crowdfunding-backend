import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRoleRo {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  public readonly id: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  public readonly name: string;
}
