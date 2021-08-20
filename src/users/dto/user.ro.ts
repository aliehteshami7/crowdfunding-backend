import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsEmail, IsString, Matches, ValidateNested } from 'class-validator';
import { UserRoleRo } from './user-role.ro';

export class UserRo {
  @IsString()
  @Expose()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Bad username' })
  @ApiProperty()
  public readonly username: string;

  @IsString()
  @Expose()
  @Matches(/^[a-zA-Z]+$/, { message: 'Bad first name' })
  @ApiProperty()
  public readonly firstName: string;

  @IsString()
  @Expose()
  @Matches(/^[a-zA-Z]+$/, { message: 'Bad last name' })
  @ApiProperty()
  public readonly lastName: string;

  @IsEmail()
  @Expose()
  @ApiProperty()
  public readonly email: string;

  @ValidateNested({ each: true })
  @Type(() => UserRoleRo)
  @Expose()
  @ApiProperty({ type: [UserRoleRo] })
  public readonly roles: UserRoleRo[];
}
