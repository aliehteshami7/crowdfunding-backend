import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaymentRo } from './payment.ro';

export class PaymentsRo {
  @Type(() => PaymentRo)
  @ApiProperty({ type: [PaymentRo] })
  @Expose()
  public payments: PaymentRo[];
}
