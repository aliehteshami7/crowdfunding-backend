import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BudgetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @IsNumber()
  @ApiProperty()
  public value: number;
}
