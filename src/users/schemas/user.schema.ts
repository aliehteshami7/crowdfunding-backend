import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from 'src/roles/schemas/role.schema';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class User extends Document {
  @Prop({ type: String, required: true })
  public firstName: string;

  @Prop({ type: String, required: true })
  public lastName: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  public username: string;

  @Prop({ type: String, required: true, default: 'NO_PASSWORD' })
  public password: string;

  @Prop({ type: Boolean, required: true, default: false })
  public isActive: boolean;

  @Prop({ type: String, required: true })
  public email: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Role', default: [] })
  public roles: Role[];

  public setPassword: (password: string) => Promise<void>;

  public comparePassword: (attempt: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.setPassword = async function (
  password: string,
): Promise<void> {
  this.password = await bcrypt.hash(password, 10);
};

UserSchema.methods.comparePassword = async function (
  attempt: string,
): Promise<boolean> {
  return await bcrypt.compare(attempt, this.password);
};