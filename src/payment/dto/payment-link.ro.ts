import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaymentLinkRo {
  @Expose({ name: 'url' })
  @ApiProperty()
  public readonly link: string;
}
