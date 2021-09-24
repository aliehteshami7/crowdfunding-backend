import { ApiProperty } from '@nestjs/swagger';

export class PaymentResultRo {
  @ApiProperty()
  public readonly status: string;

  @ApiProperty()
  public readonly message: string;
}
