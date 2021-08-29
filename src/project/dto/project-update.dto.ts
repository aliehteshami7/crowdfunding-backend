import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public description: string;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty()
  @Expose()
  public imageUrls: string[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  @Expose()
  public state: boolean;
}
