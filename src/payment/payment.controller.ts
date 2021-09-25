import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { PermissionTag } from 'src/roles/enum/permission-tag.enum';
import { User } from 'src/users/schemas/user.schema';
import { DonateDto } from './dto/donate.ro';
import { PayRewardDto } from './dto/pay-reward.dto';
import { PaymentLinkRo } from './dto/payment-link.ro';
import { PaymentResultRo } from './dto/payment-result.ro';
import { PaymentService } from './payment.service';
import { Permissions } from 'src/roles/decorators/permissions.decorator';
import { PaymentsRo } from './dto/payments.ro';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(PaymentService)
    private readonly paymentService: PaymentService,
  ) {}

  @Post('reward')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Pay for a reward' })
  @ApiOkResponse({ type: PaymentLinkRo })
  async payReward(
    @Body() payRewardDto: PayRewardDto,
    @CurrentUser() currentUser: User,
  ): Promise<PaymentLinkRo> {
    return this.paymentService.payReward(payRewardDto, currentUser);
  }

  @Post('donate')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Donate money to a project' })
  @ApiOkResponse({ type: PaymentLinkRo })
  async donate(
    @Body() donateDto: DonateDto,
    @CurrentUser() currentUser: User,
  ): Promise<PaymentLinkRo> {
    return this.paymentService.donate(donateDto, currentUser);
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verify payment' })
  @ApiOkResponse({ type: PaymentLinkRo })
  async verify(
    @Query('Authority') authority: string,
    @Query('Status') status: string,
  ): Promise<PaymentResultRo> {
    return this.paymentService.verify(authority, status);
  }

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all payments. It's for admins" })
  @ApiOkResponse({ type: PaymentsRo })
  async findAll(): Promise<PaymentsRo> {
    return this.paymentService.findAll();
  }

  @Get('project/:projectId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Get all project payments. It's for admins and project owners",
  })
  @ApiOkResponse({ type: PaymentsRo })
  async findPaymentsOfProject(
    @Param('projectId') projectId: string,
    @CurrentUser() currentUser: User,
  ): Promise<PaymentsRo> {
    return this.paymentService.findPaymentsOfProject(projectId, currentUser);
  }

  @Get('user/:username')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Get all user payments. Users can only see thir own payment. Admin can check all user payments',
  })
  @ApiOkResponse({ type: PaymentsRo })
  async findPaymentsOfUser(
    @Param('username') username: string,
    @CurrentUser() currentUser: User,
  ): Promise<PaymentsRo> {
    return this.paymentService.findPaymentsOfUser(username, currentUser);
  }
}
