import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PayRewardDto {
  @IsString()
  @ApiProperty()
  public readonly rewardId: string;
}
