import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DonateDto {
  @IsNumber()
  @ApiProperty()
  public readonly amount: number;

  @IsString()
  @ApiProperty()
  public readonly projectId: string;
}
