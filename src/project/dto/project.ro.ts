import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserRo } from 'src/users/dto/user.ro';
import { CategoryEnum } from '../enum/category.enum';
import { BudgetDto } from './budget.dto';
import { RewardRo } from './reward.ro';
import { TechnicalDescriptiontDto } from './technical-description.dto';
import { TimelinetDto } from './timeline.dto';

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetDto)
  @ApiProperty({ type: [BudgetDto] })
  @Expose()
  public budgets: BudgetDto[];

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnicalDescriptiontDto)
  @ApiProperty({ type: [TechnicalDescriptiontDto] })
  @Expose()
  public technicalDescriptions: TechnicalDescriptiontDto[];

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimelinetDto)
  @ApiProperty({ type: [TimelinetDto] })
  @Expose()
  public timelines: TimelinetDto[];

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
