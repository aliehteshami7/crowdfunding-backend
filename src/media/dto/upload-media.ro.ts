import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UploadMediaRo {
  @IsString()
  @ApiProperty()
  @Expose()
  public path: string;
}
