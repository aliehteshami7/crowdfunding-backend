import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, ProjectSchema } from './schemas/project.schema';
import { Review, ReviewSchema } from './schemas/review.schema';
import { Reward, RewardSchema } from './schemas/reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
    UsersModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
