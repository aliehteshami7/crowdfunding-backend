import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RewardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public value: string;
}
