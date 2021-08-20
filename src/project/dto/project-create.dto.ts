import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ProjectCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public blog: string;

  @IsString({ each: true })
  @ApiProperty()
  @Expose()
  public imageUrls: string[];

  @IsBoolean()
  @ApiProperty()
  @Expose()
  public state: boolean;
}
