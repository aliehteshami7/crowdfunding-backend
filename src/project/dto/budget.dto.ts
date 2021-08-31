import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BudgetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public title: string;

  @IsNumber()
  @ApiProperty()
  @Expose()
  public value: number;
}
