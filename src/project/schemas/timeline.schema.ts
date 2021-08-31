import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Timeline extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: Date, required: true })
  public date: Date;
}

export const TimelineSchema = SchemaFactory.createForClass(Timeline);
