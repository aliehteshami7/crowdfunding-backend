import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Review extends Document {
  @Prop({ type: Number, required: true })
  public score: number;

  @Prop({ type: String, required: true })
  public text: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  public reviewer: User;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
