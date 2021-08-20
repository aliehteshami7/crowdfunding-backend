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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/schemas/user.schema';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { ProjectRo } from './dto/project.ro';
import { ProjectsRo } from './dto/projects.ro';
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
  async create(
    @Body() projectCreateDto: ProjectCreateDto,
    @CurrentUser() currentUser: User,
  ): Promise<ProjectRo> {
    return await this.projectService.create(projectCreateDto, currentUser);
  }

  @Get(':projectId')
  @ApiOperation({ summary: 'Get project by project id' })
  async get(@Param('projectId') projectId: string): Promise<ProjectRo> {
    return await this.projectService.read(projectId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  async find(): Promise<ProjectsRo> {
    return await this.projectService.find();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':projectId')
  @ApiOperation({ summary: 'Update information of an existing project' })
  async update(
    @Param('projectId') projectId: string,
    @Body() projectUpdateDto: ProjectUpdateDto,
  ): Promise<ProjectRo> {
    return await this.projectService.update(projectId, projectUpdateDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':projectId')
  @ApiOperation({ summary: 'Delete a project by its id' })
  async delete(@Param('projectId') projectId: string): Promise<void> {
    await this.projectService.delete(projectId);
  }
}
