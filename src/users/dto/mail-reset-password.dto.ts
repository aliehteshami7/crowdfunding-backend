import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class MailResetPasswordDto {
  @IsEmail()
  @ApiProperty()
  public readonly email: string;
}
