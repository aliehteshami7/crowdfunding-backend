import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { UserRo } from 'src/users/dto/user.ro';

export class LoginRo {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public token: string;

  @IsNotEmpty()
  @ApiProperty()
  public user: UserRo;
}
