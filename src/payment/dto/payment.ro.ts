import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProjectRo } from 'src/project/dto/project.ro';
import { RewardRo } from 'src/project/dto/reward.ro';
import { UserRo } from 'src/users/dto/user.ro';

export class PaymentRo {
  @ApiProperty()
  @Expose()
  public amount: number;

  @ApiProperty()
  @Type(() => UserRo)
  @Expose()
  public user: UserRo;

  @ApiProperty()
  @Type(() => ProjectRo)
  @Expose()
  public project: ProjectRo;

  @ApiProperty()
  @Type(() => RewardRo)
  @Expose()
  public reward: RewardRo;

  @ApiProperty()
  @Expose()
  public state: string;

  // ZarrinPal

  @ApiProperty()
  @Expose()
  public authority: string;

  @ApiProperty()
  @Expose()
  public status: number;

  @ApiProperty()
  @Expose()
  public refId: number;
}
