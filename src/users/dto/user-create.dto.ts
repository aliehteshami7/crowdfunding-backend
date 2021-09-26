import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Bad username' })
  public readonly username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])[^\s]{8,20}$/, {
    message: 'password too weak',
  })
  @ApiProperty()
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly avatarAddress?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly professionalName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly website?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly linkedinAddress?: string;
}
