import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { MailConfigDto } from './mail-config.dto';
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

  @Expose()
  @ApiProperty()
  public readonly avatarAddress: string;

  @Expose()
  @ApiProperty()
  public readonly description: string;

  @Expose()
  @ApiProperty()
  public readonly professionalName: string;

  @Expose()
  @ApiProperty()
  public readonly address: string;

  @Expose()
  @ApiProperty()
  public readonly website: string;

  @Expose()
  @ApiProperty()
  public readonly linkedinAddress: string;

  @Expose()
  @Type(() => MailConfigDto)
  @ApiProperty({ type: MailConfigDto })
  public readonly mailConfig?: MailConfigDto;
}
