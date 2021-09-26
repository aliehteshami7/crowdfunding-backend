import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from 'src/project/schemas/project.schema';
import { Reward } from 'src/project/schemas/reward.schema';
import { User } from 'src/users/schemas/user.schema';
import { PaymentStateEnum } from '../enums/payment-state.enum';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Payment extends Document {
  @Prop({ type: Number, required: true })
  public amount: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  public user: User;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Project',
    required: true,
  })
  public project: Project;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Reward', required: false })
  public reward?: Reward;

  @Prop({
    type: String,
    required: true,
    enum: PaymentStateEnum,
    default: PaymentStateEnum.PENDING,
  })
  public state: string;

  // ZarrinPal

  @Prop({ type: String, required: false })
  public authority?: string;

  @Prop({ type: Number, required: false })
  public status?: number;

  @Prop({ type: Number, required: false })
  public refId?: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
