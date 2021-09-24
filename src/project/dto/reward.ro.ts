import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RewardRo {
  @IsString()
  @Expose({ name: '_id' })
  @Expose({ name: 'id' })
  @Type(() => String)
  @ApiProperty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public description: string;

  @IsNumber()
  @ApiProperty()
  @Expose()
  public value: number;
}
