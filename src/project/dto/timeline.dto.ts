import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class TimelinetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  public date: Date;
}
