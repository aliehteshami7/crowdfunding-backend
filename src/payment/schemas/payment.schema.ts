import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Payment extends Document {}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
