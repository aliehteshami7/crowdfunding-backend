import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRo } from 'src/users/dto/user.ro';
import { CategoryEnum } from '../enum/category.enum';
import { ProjectStateEnum } from '../enum/project-state.enum';
import { BudgetDto } from './budget.dto';
import { ReviewRo } from './review.ro';
import { RewardRo } from './reward.ro';
import { TechnicalDescriptiontDto } from './technical-description.dto';
import { TimelinetDto } from './timeline.dto';

export class ProjectRo {
  @Expose({ name: '_id' })
  @Expose({ name: 'id' })
  @Type(() => String)
  @ApiProperty()
  public id: string;

  @ApiProperty()
  @Expose()
  public subject: string;

  @ApiProperty()
  @Expose()
  public institution: string;

  @ApiProperty({
    enum: CategoryEnum,
    enumName: 'Category',
  })
  public category: CategoryEnum;

  @ApiProperty()
  @Expose()
  public summary: string;

  @Type(() => BudgetDto)
  @ApiProperty({ type: [BudgetDto] })
  @Expose()
  public budgets: BudgetDto[];

  @ApiProperty()
  @Expose()
  public budgetReason: string;

  @ApiProperty()
  @Expose()
  public projectFirstIdea: string;

  @ApiProperty()
  @Expose()
  public projectMainIdea: string;

  @ApiProperty()
  @Expose()
  public projectGoal: string;

  @Type(() => TechnicalDescriptiontDto)
  @ApiProperty({ type: [TechnicalDescriptiontDto] })
  @Expose()
  public technicalDescriptions: TechnicalDescriptiontDto[];

  @ApiProperty()
  @Expose()
  public projectAdditionalInfo: string;

  @ApiProperty()
  @Expose()
  public timeDescription: string;

  @Type(() => TimelinetDto)
  @ApiProperty({ type: [TimelinetDto] })
  @Expose()
  public timelines: TimelinetDto[];

  @ApiProperty()
  @Expose()
  public imageUrls: string[];

  @ApiProperty({
    enum: ProjectStateEnum,
  })
  @Expose()
  public state: ProjectStateEnum;

  @Type(() => UserRo)
  @ApiProperty()
  @Expose()
  public owner: UserRo;

  @Type(() => RewardRo)
  @ApiProperty({ type: [RewardRo] })
  @Expose()
  public rewards: RewardRo[];

  @Type(() => ReviewRo)
  @ApiProperty({ type: [ReviewRo] })
  @Expose()
  public reviews: ReviewRo[];
}
