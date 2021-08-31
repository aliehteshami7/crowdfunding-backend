import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CategoryEnum } from '../enum/category.enum';

export class ProjectCreateDto {
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

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public institution: string;

  @IsEnum(CategoryEnum)
  @ApiProperty({
    enum: CategoryEnum,
    enumName: 'Category',
  })
  public category: CategoryEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public summary: string;

  // TODO: budget

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public budgetReason: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public projectFirstIdea: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public projectMainIdea: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public projectGoal: string;

  // TODO: technicalDesciption

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public projectAdditionalInfo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public timeDescription: string;

  // TODO: projectTiming

  @IsString({ each: true })
  @ApiProperty()
  @Expose()
  public imageUrls: string[];

  @IsBoolean()
  @ApiProperty()
  @Expose()
  public state: boolean;
}
