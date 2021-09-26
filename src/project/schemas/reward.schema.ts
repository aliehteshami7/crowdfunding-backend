import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Reward extends Document {
  @Prop({ type: String, required: true })
  public title: string;

  @Prop({ type: String, required: false })
  public description?: string;

  @Prop({ type: Number, required: true })
  public value: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
