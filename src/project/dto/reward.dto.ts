import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  @ApiProperty()
  @Expose()
  public value: number;
}
