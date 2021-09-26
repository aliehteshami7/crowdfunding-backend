import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class MailConfigDto {
  @IsBoolean()
  @Expose()
  @ApiProperty()
  public profile: boolean;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  public supportedProjects: boolean;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  public createdProjects: boolean;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  public crowdfundingUpdates: boolean;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  public projectReviews: boolean;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  public magazine: boolean;
}
