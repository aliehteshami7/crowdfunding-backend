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

export class ProjectUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public name: string;

  @IsOptional()
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

  @IsOptional()
  @IsEnum(CategoryEnum)
  @ApiProperty({
    enum: CategoryEnum,
    enumName: 'Category',
  })
  public category: CategoryEnum;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public summary: string;

  // TODO: budget

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public budgetReason: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public projectFirstIdea: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public projectMainIdea: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public timeDescription: string;

  // TODO: projectTiming

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty()
  @Expose()
  public imageUrls: string[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  @Expose()
  public state: boolean;
}
