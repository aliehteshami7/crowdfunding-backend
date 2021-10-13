import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PayRewardDto {
  @IsString()
  @ApiProperty()
  public readonly rewardId: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  public readonly callbackUrl: string;
}
