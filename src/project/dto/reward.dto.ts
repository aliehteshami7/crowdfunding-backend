import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RewardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public description: string;

  @IsNumber()
  @ApiProperty()
  public value: number;
}
