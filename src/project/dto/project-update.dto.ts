import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CategoryEnum } from '../enum/category.enum';
import { ProjectState } from '../enum/project-state.enum';
import { BudgetDto } from './budget.dto';
import { TechnicalDescriptiontDto } from './technical-description.dto';
import { TimelinetDto } from './timeline.dto';

export class ProjectUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public subject: string;

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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetDto)
  @ApiProperty({ type: [BudgetDto] })
  @Expose()
  public budgets: BudgetDto[];

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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnicalDescriptiontDto)
  @ApiProperty({ type: [TechnicalDescriptiontDto] })
  @Expose()
  public technicalDescriptions: TechnicalDescriptiontDto[];

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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimelinetDto)
  @ApiProperty({ type: [TimelinetDto] })
  @Expose()
  public timelines: TimelinetDto[];

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty()
  @Expose()
  public imageUrls: string[];

  @IsOptional()
  @IsEnum(ProjectState)
  @ApiProperty({
    enum: ProjectState,
  })
  @Expose()
  public state: ProjectState;
}
