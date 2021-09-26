import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CategoryEnum } from '../enum/category.enum';
import { ProjectStateEnum } from '../enum/project-state.enum';
import { BudgetDto } from './budget.dto';
import { TechnicalDescriptiontDto } from './technical-description.dto';
import { TimelinetDto } from './timeline.dto';

export class ProjectUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  public subject?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  public institution?: string;

  @IsOptional()
  @IsEnum(CategoryEnum)
  @ApiProperty({
    enum: CategoryEnum,
    enumName: 'Category',
    required: false,
  })
  public category?: CategoryEnum;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  public summary?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetDto)
  @ApiProperty({ type: [BudgetDto], required: false })
  public budgets?: BudgetDto[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  public budgetReason?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  public projectFirstIdea?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  public projectMainIdea?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  public projectGoal?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnicalDescriptiontDto)
  @ApiProperty({ type: [TechnicalDescriptiontDto], required: false })
  public technicalDescriptions?: TechnicalDescriptiontDto[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  public projectAdditionalInfo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  public timeDescription?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimelinetDto)
  @ApiProperty({ type: [TimelinetDto], required: false })
  public timelines?: TimelinetDto[];

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ required: false })
  public imageUrls?: string[];

  @IsOptional()
  @IsEnum(ProjectStateEnum)
  @ApiProperty({
    enum: ProjectStateEnum,
    required: false,
  })
  public state?: ProjectStateEnum;
}
