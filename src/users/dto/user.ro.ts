import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRoleRo } from './user-role.ro';

export class UserRo {
  @Expose()
  @ApiProperty()
  public readonly username: string;

  @Expose()
  @ApiProperty()
  public readonly firstName: string;

  @Expose()
  @ApiProperty()
  public readonly lastName: string;

  @Expose()
  @ApiProperty()
  public readonly email: string;

  @Type(() => UserRoleRo)
  @Expose()
  @ApiProperty({ type: [UserRoleRo] })
  public readonly roles: UserRoleRo[];

  @Expose()
  @ApiProperty()
  public readonly blog: string;

  @ApiProperty()
  public readonly avatarAddress: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly professionalName: string;

  @ApiProperty()
  public readonly address: string;

  @ApiProperty()
  public readonly website: string;

  @ApiProperty()
  public readonly linkedinAddress: string;
}
