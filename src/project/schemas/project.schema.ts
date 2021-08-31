import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CategoryEnum } from '../enum/category.enum';
import { Reward } from './reward.schema';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Project extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, required: true })
  public description: string;

  @Prop({ type: String, required: false, default: '' })
  public institution: string;

  @Prop({ type: String, required: true, enum: CategoryEnum })
  public category: CategoryEnum;

  @Prop({ type: String, required: true })
  public summary: string;

  // TODO: budget

  @Prop({ type: String, required: true })
  public budgetReason: string;

  @Prop({ type: String, required: true })
  public projectFirstIdea: string;

  @Prop({ type: String, required: true })
  public projectMainIdea: string;

  @Prop({ type: String, required: true })
  public projectGoal: string;

  // TODO: technicalDesciption

  @Prop({ type: String, required: false, default: '' })
  public projectAdditionalInfo: string;

  @Prop({ type: String, required: true })
  public timeDescription: string;

  // TODO: projectTiming

  @Prop({ type: [String], required: true, default: [] })
  public imageUrls: string[];

  @Prop({ type: Boolean, required: true, default: false })
  public state: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  public owner: User;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Reward', default: [] })
  public rewards: Reward[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
