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
  @ApiProperty()
  public subject?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public institution?: string;

  @IsOptional()
  @IsEnum(CategoryEnum)
  @ApiProperty({
    enum: CategoryEnum,
    enumName: 'Category',
  })
  public category?: CategoryEnum;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public summary?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetDto)
  @ApiProperty({ type: [BudgetDto] })
  public budgets?: BudgetDto[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public budgetReason?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public projectFirstIdea?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public projectMainIdea?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public projectGoal?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnicalDescriptiontDto)
  @ApiProperty({ type: [TechnicalDescriptiontDto] })
  public technicalDescriptions?: TechnicalDescriptiontDto[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public projectAdditionalInfo?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public timeDescription?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimelinetDto)
  @ApiProperty({ type: [TimelinetDto] })
  public timelines?: TimelinetDto[];

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty()
  public imageUrls?: string[];

  @IsOptional()
  @IsEnum(ProjectStateEnum)
  @ApiProperty({
    enum: ProjectStateEnum,
  })
  public state?: ProjectStateEnum;
}
