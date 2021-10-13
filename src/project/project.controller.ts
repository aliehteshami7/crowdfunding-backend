import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/roles/decorators/permissions.decorator';
import { PermissionTag } from 'src/roles/enum/permission-tag.enum';
import { User } from 'src/users/schemas/user.schema';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { ProjectRo } from './dto/project.ro';
import { ProjectsRo } from './dto/projects.ro';
import { ReviewDto } from './dto/review.dto';
import { RewardDto } from './dto/reward.dto';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(
    @Inject(ProjectService)
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new project' })
  @ApiCreatedResponse({ type: ProjectRo })
  async create(
    @Body() projectCreateDto: ProjectCreateDto,
    @CurrentUser() currentUser: User,
  ): Promise<ProjectRo> {
    return await this.projectService.create(projectCreateDto, currentUser);
  }

  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({ summary: "Get all projects, It's for Admins" })
  @ApiOkResponse({ type: ProjectsRo })
  async findForAdmin(): Promise<ProjectsRo> {
    return await this.projectService.findForAdmin();
  }

  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.REVIEWER)
  @UseGuards(JwtAuthGuard)
  @Get('reviewing')
  @ApiOperation({ summary: "Get all reviewing projects, It's for Reviewers" })
  @ApiOkResponse({ type: ProjectsRo })
  async findForReviewer(): Promise<ProjectsRo> {
    return await this.projectService.findForReviewer();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('myProjects')
  @ApiOperation({ summary: 'Get all projects of current user' })
  @ApiOkResponse({ type: ProjectsRo })
  async findMyProjects(@CurrentUser() currentUser: User): Promise<ProjectsRo> {
    return await this.projectService.findUserProjects(currentUser);
  }

  @Get(':projectId')
  @ApiOperation({ summary: 'Get project by project id' })
  @ApiOkResponse({ type: ProjectRo })
  async get(@Param('projectId') projectId: string): Promise<ProjectRo> {
    return await this.projectService.read(projectId);
  }

  @Get()
  @ApiOperation({ summary: "Get reviewed projects, It's for default users" })
  @ApiOkResponse({ type: ProjectsRo })
  async find(): Promise<ProjectsRo> {
    return await this.projectService.find();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':projectId')
  @ApiOperation({
    summary:
      'Update information of an existing project, user should be admin or owner',
  })
  async update(
    @Param('projectId') projectId: string,
    @Body() projectUpdateDto: ProjectUpdateDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    return await this.projectService.update(
      projectId,
      projectUpdateDto,
      currentUser,
    );
  }

  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete(':projectId')
  @ApiOperation({ summary: "Delete a project by its id, It's for admins" })
  async delete(@Param('projectId') projectId: string): Promise<void> {
    await this.projectService.delete(projectId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':projectId/addReward')
  @ApiOperation({
    summary: 'Add a reward to a project, user should be admin or owner',
  })
  async addReward(
    @Param('projectId') projectId: string,
    @Body() rewardDto: RewardDto,
    @CurrentUser() currentUser: User,
  ): Promise<ProjectRo> {
    return await this.projectService.addReward(
      projectId,
      rewardDto,
      currentUser,
    );
  }

  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.REVIEWER)
  @UseGuards(JwtAuthGuard)
  @Post(':projectId/review')
  @ApiOperation({
    summary:
      "Review a project, It's for reviewer. If reviewr's review exists, then it updates it",
  })
  async addReview(
    @Param('projectId') projectId: string,
    @Body() reviewDto: ReviewDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.projectService.addReview(projectId, reviewDto, currentUser);
  }
}
