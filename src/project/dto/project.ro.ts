import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserRo } from 'src/users/dto/user.ro';
import { RewardRo } from './reward.ro';

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RewardRo)
  @ApiProperty({ type: [RewardRo] })
  @Expose()
  public rewards: RewardRo[];
}
