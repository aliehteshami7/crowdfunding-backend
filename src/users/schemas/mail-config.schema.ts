import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class MailConfig extends Document {
  @Prop({ type: Boolean, required: true, default: true })
  public profile: boolean;

  @Prop({ type: Boolean, required: true, default: true })
  public supportedProjects: boolean;

  @Prop({ type: Boolean, required: true, default: true })
  public createdProjects: boolean;

  @Prop({ type: Boolean, required: true, default: true })
  public crowdfundingUpdates: boolean;

  @Prop({ type: Boolean, required: true, default: true })
  public projectReviews: boolean;

  @Prop({ type: Boolean, required: true, default: true })
  public magazine: boolean;
}

export const MailConfigSchema = SchemaFactory.createForClass(MailConfig);
