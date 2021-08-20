import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UserRo } from 'src/users/dto/user.ro';

export class ProjectRo {
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
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public blog: string;

  @IsString({ each: true })
  @ApiProperty()
  @Expose()
  public imageUrls: string[];

  @IsBoolean()
  @ApiProperty()
  @Expose()
  public state: boolean;

  @Type(() => UserRo)
  @ApiProperty()
  @Expose()
  public owner: UserRo;
}
