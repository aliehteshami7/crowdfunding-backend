import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UploadMediaRo {
  @ApiProperty()
  @Expose()
  public path: string;
}
