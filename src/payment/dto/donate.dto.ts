import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class DonateDto {
  @IsNumber()
  @ApiProperty()
  public readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly projectId: string;

  @IsUrl()
  @ApiProperty()
  public readonly callbackUrl: string;
}
