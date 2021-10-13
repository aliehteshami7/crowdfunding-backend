import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { BlogStateEnum } from '../enum/blog-state.enum';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Blog extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  public writer: User;

  @Prop({ type: String, required: true })
  public blog: string;

  @Prop({ type: String, required: true })
  public mainPicture: string;

  @Prop({
    type: String,
    enum: BlogStateEnum,
    default: 'REVIEWING',
  })
  public state: BlogStateEnum;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
