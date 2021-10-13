import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { ProjectRo } from './dto/project.ro';
import { ProjectsRo } from './dto/projects.ro';
import { Project } from './schemas/project.schema';
import { ObjectID } from 'mongodb';
import { RewardDto } from './dto/reward.dto';
import { Reward } from './schemas/reward.schema';
import { ProjectStateEnum } from './enum/project-state.enum';
import { UserRolesService } from 'src/users/user-roles.service';
import { PermissionTag } from 'src/roles/enum/permission-tag.enum';
import { ReviewDto } from './dto/review.dto';
import { Review } from './schemas/review.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
    @InjectModel(Reward.name)
    private rewardModel: Model<Reward>,
    @InjectModel(Review.name)
    private reviewModel: Model<Review>,
    @Inject(UserRolesService)
    private userRolesService: UserRolesService,
  ) {}

  async create(
    projectCreateDto: ProjectCreateDto,
    creator: User,
  ): Promise<ProjectRo> {
    try {
      const projectValue = { ...projectCreateDto, owner: creator };
      const project = await this.projectModel.create(projectValue);
      return plainToClass(ProjectRo, await project.save(), {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async read(projectId: string): Promise<ProjectRo> {
    if (!ObjectID.isValid(projectId)) {
      throw new NotFoundException();
    }
    const project = await this.projectModel
      .findOne({ _id: projectId })
      .populate('owner')
      .populate('rewards')
      .populate('reviews');
    if (!project) {
      throw new NotFoundException();
    }
    return plainToClass(ProjectRo, project, { excludeExtraneousValues: true });
  }

  async find(): Promise<ProjectsRo> {
    const projects = await this.projectModel
      .find({
        state: {
          $nin: [
            ProjectStateEnum.START,
            ProjectStateEnum.REVIEWING,
            ProjectStateEnum.REJECTED,
          ],
        },
      })
      .populate('owner')
      .populate('rewards')
      .populate('reviews');
    return plainToClass(
      ProjectsRo,
      { projects },
      { excludeExtraneousValues: true },
    );
  }

  async findForReviewer(): Promise<ProjectsRo> {
    const projects = await this.projectModel
      .find({
        state: { $in: [ProjectStateEnum.REVIEWING] },
      })
      .populate('owner')
      .populate('rewards')
      .populate('reviews');
    return plainToClass(
      ProjectsRo,
      { projects },
      { excludeExtraneousValues: true },
    );
  }

  async findForAdmin(): Promise<ProjectsRo> {
    const projects = await this.projectModel
      .find({})
      .populate('owner')
      .populate('rewards')
      .populate('reviews');
    return plainToClass(
      ProjectsRo,
      { projects },
      { excludeExtraneousValues: true },
    );
  }

  async findUserProjects(currentUser: User): Promise<ProjectsRo> {
    const projects = await this.projectModel
      .find({ owner: currentUser.id })
      .populate('owner')
      .populate('rewards')
      .populate('reviews');
    return plainToClass(
      ProjectsRo,
      { projects },
      { excludeExtraneousValues: true },
    );
  }

  async update(
    projectId: string,
    projectUpdateDto: ProjectUpdateDto,
    currentUser: User,
  ): Promise<void> {
    if (!ObjectID.isValid(projectId)) {
      throw new NotFoundException();
    }
    await this.checkPermission(projectId, currentUser);
    const project = await this.projectModel
      .findOneAndUpdate({ _id: projectId }, { $set: projectUpdateDto })
      .populate('owner')
      .populate('rewards')
      .populate('reviews');
    if (!project) {
      throw new NotFoundException();
    }
  }

  async delete(projectId: string): Promise<void> {
    if (!ObjectID.isValid(projectId)) {
      throw new NotFoundException();
    }
    const del = await this.projectModel.deleteOne({ _id: projectId });
    if (!del.deletedCount) {
      throw new NotFoundException();
    }
  }

  async addReward(
    projectId: string,
    rewardDto: RewardDto,
    currentUser: User,
  ): Promise<ProjectRo> {
    if (!ObjectID.isValid(projectId)) {
      throw new NotFoundException();
    }
    await this.checkPermission(projectId, currentUser);
    const reward = await this.rewardModel.create(rewardDto);
    let project = await this.projectModel.findOneAndUpdate(
      { _id: projectId },
      {
        $push: {
          rewards: {
            ...reward,
          },
        },
      },
    );
    if (!project) {
      throw new NotFoundException();
    }
    project = await this.projectModel
      .findById(projectId)
      .populate('owner')
      .populate('rewards')
      .populate('reviews');
    return plainToClass(ProjectRo, await project, {
      excludeExtraneousValues: true,
    });
  }

  async checkPermission(projectId: string, currentUser: User): Promise<void> {
    const project = await this.read(projectId);
    try {
      await this.userRolesService.checkPermission({
        username: currentUser.username,
        permissions: [PermissionTag.ADMIN],
      });
      return;
    } catch {}
    if (project.owner.username === currentUser.username) {
      return;
    }
    throw new ForbiddenException('You do not have permission');
  }

  async addReview(
    projectId: string,
    reviewDto: ReviewDto,
    currentUser: User,
  ): Promise<void> {
    if (!ObjectID.isValid(projectId)) {
      throw new NotFoundException();
    }

    const project = await this.projectModel
      .findById(projectId)
      .populate('reviews');

    if (!project) {
      throw new NotFoundException();
    }

    let review = null;

    project.reviews.forEach((rev) => {
      if (rev.reviewer.username === currentUser.username) {
        review = rev;
      }
    });

    if (review == null) {
      review = await this.reviewModel.create({
        score: reviewDto.score,
        text: reviewDto.text,
        reviewer: currentUser,
      });
    } else {
      review.score = reviewDto.score;
      review.text = reviewDto.text;
    }

    await review.save();
    await project.update({
      $push: {
        reviews: {
          ...review,
        },
      },
    });
  }
}
