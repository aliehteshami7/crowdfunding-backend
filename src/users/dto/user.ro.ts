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
  @ApiProperty()
  public readonly firstName: string;

  @IsString()
  @Expose()
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

  @IsString()
  @Expose()
  @ApiProperty()
  public readonly blog: string;

  @IsString()
  @ApiProperty()
  public readonly avatarAddress: string;

  @IsString()
  @ApiProperty()
  public readonly description: string;

  @IsString()
  @ApiProperty()
  public readonly professionalName: string;

  @IsString()
  @ApiProperty()
  public readonly address: string;

  @IsString()
  @ApiProperty()
  public readonly website: string;

  @IsString()
  @ApiProperty()
  public readonly linkedinAddress: string;
}
