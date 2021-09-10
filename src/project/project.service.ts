import { Injectable, NotFoundException } from '@nestjs/common';
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
import { ProjectState } from './enum/project-state.enum';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
    @InjectModel(Reward.name)
    private rewardModel: Model<Reward>,
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
      .populate('rewards');
    if (!project) {
      throw new NotFoundException();
    }
    return plainToClass(ProjectRo, project, { excludeExtraneousValues: true });
  }

  async find(): Promise<ProjectsRo> {
    const projects = await this.projectModel
      .find({ state: { $nin: [ProjectState.START, ProjectState.REVIEWING] } })
      .populate('owner')
      .populate('rewards');
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
      .populate('rewards');
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
      .populate('rewards');
    return plainToClass(
      ProjectsRo,
      { projects },
      { excludeExtraneousValues: true },
    );
  }

  async update(
    projectId: string,
    projectUpdateDto: ProjectUpdateDto,
  ): Promise<ProjectRo> {
    if (!ObjectID.isValid(projectId)) {
      throw new NotFoundException();
    }
    const project = await this.projectModel
      .findOneAndUpdate({ _id: projectId }, projectUpdateDto)
      .populate('owner')
      .populate('rewards');
    if (!project) {
      throw new NotFoundException();
    }
    return plainToClass(ProjectRo, await project, {
      excludeExtraneousValues: true,
    });
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

  async addReward(projectId: string, rewardDto: RewardDto): Promise<ProjectRo> {
    if (!ObjectID.isValid(projectId)) {
      throw new NotFoundException();
    }
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
      .populate('rewards');
    return plainToClass(ProjectRo, await project, {
      excludeExtraneousValues: true,
    });
  }
}
