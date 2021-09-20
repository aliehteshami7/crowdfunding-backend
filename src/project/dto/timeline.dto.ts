import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class TimelinetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public name: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  @Expose()
  public date: Date;
}
