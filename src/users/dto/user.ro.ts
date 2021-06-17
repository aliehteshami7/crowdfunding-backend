import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsEmail, IsString, Matches } from 'class-validator';
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

  @Type(() => UserRoleRo)
  @Expose()
  @ApiProperty()
  public readonly roles: UserRoleRo[];
}
