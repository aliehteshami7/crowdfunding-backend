import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Bad username' })
  @ApiProperty()
  public readonly username: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public readonly lastName: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  public readonly email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly blog: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly avatarAddress: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly professionalName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly address: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly website: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public readonly linkedinAddress: string;
}
