import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CategoryEnum } from '../enum/category.enum';
import { ProjectStateEnum } from '../enum/project-state.enum';
import { Budget, BudgetSchema } from './budget.schema';
import { Description, DescriptionSchema } from './description.schema';
import { Reward } from './reward.schema';
import { Timeline, TimelineSchema } from './timeline.schema';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Project extends Document {
  @Prop({ type: String, required: true })
  public subject: string;

  @Prop({ type: String, required: false, default: '' })
  public institution: string;

  @Prop({ type: String, required: true, enum: CategoryEnum })
  public category: CategoryEnum;

  @Prop({ type: String, required: true })
  public summary: string;

  @Prop({ type: [BudgetSchema], required: true, default: [] })
  public budgets: Budget[];

  @Prop({ type: String, required: true })
  public budgetReason: string;

  @Prop({ type: String, required: true })
  public projectFirstIdea: string;

  @Prop({ type: String, required: true })
  public projectMainIdea: string;

  @Prop({ type: String, required: true })
  public projectGoal: string;

  @Prop({ type: [DescriptionSchema], required: true, default: [] })
  public technicalDescriptions: Description[];

  @Prop({ type: String, required: false, default: '' })
  public projectAdditionalInfo: string;

  @Prop({ type: String, required: true })
  public timeDescription: string;

  @Prop({ type: [TimelineSchema], required: true, default: [] })
  public timelines: Timeline[];

  @Prop({ type: [String], required: true, default: [] })
  public imageUrls: string[];

  @Prop({
    type: String,
    enum: ProjectStateEnum,
    default: 'START',
  })
  public state: ProjectStateEnum;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  public owner: User;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Reward', default: [] })
  public rewards: Reward[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
