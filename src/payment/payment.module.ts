import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/project/schemas/project.schema';
import { Reward, RewardSchema } from 'src/project/schemas/reward.schema';
import { UsersModule } from 'src/users/users.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment, PaymentSchema } from './schemas/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
    UsersModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
