import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class RewardRo {
  @Expose({ name: '_id' })
  @Type(() => String)
  @ApiProperty()
  public id: string;

  @ApiProperty()
  @Expose()
  public title: string;

  @ApiProperty()
  @Expose()
  public description: string;

  @ApiProperty()
  @Expose()
  public value: number;
}
