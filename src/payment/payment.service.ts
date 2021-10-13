import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from 'src/project/schemas/reward.schema';
import { DonateDto } from './dto/donate.dto';
import { PayRewardDto } from './dto/pay-reward.dto';
import { PaymentLinkRo } from './dto/payment-link.ro';
import { PaymentResultRo } from './dto/payment-result.ro';
import { Payment } from './schemas/payment.schema';
import * as ZarinPalCheckout from 'zarinpal-checkout';
import { configService } from 'src/config.service';
import { plainToClass } from 'class-transformer';
import { PaymentStateEnum } from './enums/payment-state.enum';
import { User } from 'src/users/schemas/user.schema';
import { Project } from 'src/project/schemas/project.schema';
import {
  PaymentRequestInput,
  PaymentVerificationInput,
  ZarinPalInstance,
} from 'zarinpal-checkout';
import { PaymentsRo } from './dto/payments.ro';
import { UsersService } from 'src/users/users.service';
import { PermissionTag } from 'src/roles/enum/permission-tag.enum';
import { UserRolesService } from 'src/users/user-roles.service';
import { ObjectID } from 'mongodb';

@Injectable()
export class PaymentService {
  private readonly ZARRINPAL: ZarinPalInstance;
  constructor(
    @InjectModel(Payment.name)
    private paymentModel: Model<Payment>,
    @InjectModel(Reward.name)
    private rewardModel: Model<Reward>,
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(UserRolesService)
    private userRolesService: UserRolesService,
  ) {
    const paymentConfig = configService.getZarrinpalConfig();
    this.ZARRINPAL = ZarinPalCheckout.create(
      paymentConfig.merchantId,
      paymentConfig.testEnv,
    );
  }

  async findAll(): Promise<PaymentsRo> {
    const payments = await this.paymentModel
      .find()
      .populate('user', 'username')
      .populate('reward');
    return plainToClass(
      PaymentsRo,
      { payments },
      { excludeExtraneousValues: true },
    );
  }

  async findPaymentsOfProject(projectId: string, currentUser: User) {
    if (!ObjectID.isValid(projectId)) {
      throw new NotFoundException();
    }

    await this.checkAccessProjectPermission(projectId, currentUser);
    const project = await this.projectModel.findById(projectId);
    const payments = await this.paymentModel
      .find({ project })
      .populate('user', 'username')
      .populate('reward');
    return plainToClass(
      PaymentsRo,
      { payments },
      { excludeExtraneousValues: true },
    );
  }

  async findPaymentsOfUser(username: string, currentUser: User) {
    await this.checkAccessUserPermission(username, currentUser);
    const user = await this.usersService.findUserByUsername(username);
    const payments = await this.paymentModel
      .find({ user })
      .populate('user', 'username')
      .populate('reward');
    return plainToClass(
      PaymentsRo,
      { payments },
      { excludeExtraneousValues: true },
    );
  }

  async payReward(
    payRewardDto: PayRewardDto,
    currentUser: User,
  ): Promise<PaymentLinkRo> {
    if (!ObjectID.isValid(payRewardDto.rewardId)) {
      throw new NotFoundException();
    }

    const reward = await this.rewardModel.findById(payRewardDto.rewardId);
    if (!reward) {
      throw new NotFoundException('Reward not found.');
    }

    const project = await this.projectModel.findOne({ rewards: reward });
    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    const payment = await this.paymentModel.create({
      user: currentUser,
      project,
      amount: reward.value,
      reward,
    });

    await payment.save();

    const description = `Pay ${payment.amount} tomans for reward of project ${project.subject}`;

    return this.generatePaymentLink(
      payment.amount,
      description,
      payment.id,
      payRewardDto.callbackUrl,
    );
  }

  async donate(
    donateDto: DonateDto,
    currentUser: User,
  ): Promise<PaymentLinkRo> {
    if (!ObjectID.isValid(donateDto.projectId)) {
      throw new NotFoundException();
    }

    const project = await this.projectModel.findById(donateDto.projectId);
    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    const payment = await this.paymentModel.create({
      user: currentUser,
      project,
      amount: donateDto.amount,
    });

    await payment.save();

    const description = `Donate ${payment.amount} tomans to project ${project.subject}`;

    return this.generatePaymentLink(
      payment.amount,
      description,
      payment.id,
      donateDto.callbackUrl,
    );
  }

  async generatePaymentLink(
    amount: number,
    description: string,
    paymentId: ObjectID,
    callbackUrl: string,
  ): Promise<PaymentLinkRo> {
    const paymentRequestInput: PaymentRequestInput = {
      Amount: amount,
      CallbackURL: callbackUrl,
      Description: description,
    };
    const paymentRequestOutput = await this.ZARRINPAL.PaymentRequest(
      paymentRequestInput,
    );

    if (paymentRequestOutput.status != 100) {
      throw new ServiceUnavailableException({
        description: 'Payment service is not available. Please try later.',
      });
    }

    const authority = paymentRequestOutput.authority;
    await this.paymentModel.updateOne(
      { _id: paymentId },
      { $set: { authority } },
    );

    return plainToClass(PaymentLinkRo, paymentRequestOutput, {
      excludeExtraneousValues: true,
    });
  }

  async verify(
    authority: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status: string,
  ): Promise<PaymentResultRo> {
    const payment = await this.paymentModel.findOne({ authority });
    if (!payment) {
      throw new NotFoundException(
        'Payment with this authority does not exist.',
      );
    }

    const paymentVerificationInput: PaymentVerificationInput = {
      Amount: payment.amount,
      Authority: authority,
    };
    const paymentVerificationOutput = await this.ZARRINPAL.PaymentVerification(
      paymentVerificationInput,
    );

    let message;

    payment.status = paymentVerificationOutput.status;

    if (payment.status == 100 || payment.status == 101) {
      payment.state = PaymentStateEnum.SUCCESSFUL;
      payment.refId = paymentVerificationOutput.RefID;
      message = 'Payment was successful';
    } else {
      payment.state = PaymentStateEnum.FAILED;
      message = `Payment failed. status code: ${payment.status}`;
    }

    await payment.save();

    return { status: payment.state, message };
  }

  async checkAccessProjectPermission(
    projectId: string,
    currentUser: User,
  ): Promise<void> {
    const project = await this.projectModel.findById(projectId);
    try {
      await this.userRolesService.checkPermission({
        username: currentUser.username,
        permissions: [PermissionTag.ADMIN],
      });
      return;
    } catch {}
    if (project.owner.username === currentUser.username) {
      return;
    }
    throw new ForbiddenException('You do not have permission');
  }

  async checkAccessUserPermission(
    username: string,
    currentUser: User,
  ): Promise<void> {
    try {
      await this.userRolesService.checkPermission({
        username: currentUser.username,
        permissions: [PermissionTag.ADMIN],
      });
      return;
    } catch {}
    if (username === currentUser.username) {
      return;
    }
    throw new ForbiddenException('You do not have permission');
  }
}
