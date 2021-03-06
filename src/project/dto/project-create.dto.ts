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
import { BudgetDto } from './budget.dto';
import { TechnicalDescriptionDto } from './technical-description.dto';
import { TimelineDto } from './timeline.dto';

export class ProjectCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public subject: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public institution?: string;

  @IsEnum(CategoryEnum)
  @ApiProperty({
    enum: CategoryEnum,
    enumName: 'Category',
  })
  public category: CategoryEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public summary: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetDto)
  @ApiProperty({ type: [BudgetDto] })
  public budgets: BudgetDto[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public budgetReason: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public projectFirstIdea: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public projectMainIdea: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public projectGoal: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnicalDescriptionDto)
  @ApiProperty({ type: [TechnicalDescriptionDto] })
  public technicalDescriptions: TechnicalDescriptionDto[];

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  public projectAdditionalInfo?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public timeDescription: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimelineDto)
  @ApiProperty({ type: [TimelineDto] })
  public timelines: TimelineDto[];

  @IsString({ each: true })
  @ApiProperty()
  public imageUrls: string[];
}
