import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class TimelinetDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  public date: Date;
}
