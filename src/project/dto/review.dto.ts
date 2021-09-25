import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewDto {
  @IsNumber()
  @ApiProperty()
  public readonly score: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly text: string;
}
