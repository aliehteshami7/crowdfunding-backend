import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Budget extends Document {
  @Prop({ type: String, required: true })
  public title: string;

  @Prop({ type: Number, required: true })
  public value: number;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
