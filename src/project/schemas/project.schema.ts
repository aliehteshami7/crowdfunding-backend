import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Reward } from './reward.schema';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Project extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, required: true })
  public description: string;

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
