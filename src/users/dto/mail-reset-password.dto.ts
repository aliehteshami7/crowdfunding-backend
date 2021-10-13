import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class MailResetPasswordDto {
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  public readonly callbackUrl: string;
}
