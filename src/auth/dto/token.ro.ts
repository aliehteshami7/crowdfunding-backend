import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TokenRo {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public username: string;
}
