import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(PaymentService)
    private readonly paymentService: PaymentService,
  ) {}
}
