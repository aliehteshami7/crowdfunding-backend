import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly blog: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly mainPicture: string;
}
