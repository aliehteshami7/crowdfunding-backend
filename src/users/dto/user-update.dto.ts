import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { MailConfigDto } from './mail-config.dto';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Bad username' })
  @ApiProperty()
  public readonly username: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly lastName?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  public readonly email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly avatarAddress?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly headline?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly website?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly linkedinAddress?: string;

  @IsOptional()
  @Type(() => MailConfigDto)
  @ApiProperty({ type: MailConfigDto, required: false })
  public readonly mailConfig?: MailConfigDto;
}
