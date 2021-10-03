import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BudgetDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @Expose()
  @IsNumber()
  @ApiProperty()
  public value: number;
}
