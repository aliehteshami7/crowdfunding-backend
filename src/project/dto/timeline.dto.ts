import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TimelinetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public name: string;

  @Type(() => Date)
  @ApiProperty()
  @Expose()
  public date: Date;
}
