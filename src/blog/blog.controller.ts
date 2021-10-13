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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permissions } from 'src/roles/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { PermissionTag } from 'src/roles/enum/permission-tag.enum';
import { BlogService } from './blog.service';
import { BlogRo } from './dto/blog.ro';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { BlogDto } from './dto/blog.dto';
import { User } from 'src/users/schemas/user.schema';
import { BlogsRo } from './dto/blogs.ro';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(
    @Inject(BlogService)
    private readonly blogService: BlogService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiCreatedResponse({ type: BlogRo })
  async create(
    @Body() blogCreateDto: BlogDto,
    @CurrentUser() currentUser: User,
  ): Promise<BlogRo> {
    return await this.blogService.create(blogCreateDto, currentUser);
  }

  @Get()
  @ApiOperation({ summary: "Get accepted blogs list, It's for default users" })
  @ApiOkResponse({ type: BlogsRo })
  async find(): Promise<BlogsRo> {
    return await this.blogService.find();
  }

  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({ summary: "Get all blogs, It's for Admins" })
  @ApiOkResponse({ type: BlogsRo })
  async findForAdmin(): Promise<BlogsRo> {
    return await this.blogService.findForAdmin();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('myBlogs')
  @ApiOperation({ summary: 'Get all blogs of current user' })
  @ApiOkResponse({ type: BlogsRo })
  async findMyBlogs(@CurrentUser() currentUser: User): Promise<BlogsRo> {
    return await this.blogService.findUserBlogs(currentUser);
  }

  @Get(':blogId')
  @ApiOperation({ summary: 'Get blog by blog id' })
  @ApiOkResponse({ type: BlogRo })
  async get(@Param('blogId') blogId: string): Promise<BlogRo> {
    return await this.blogService.read(blogId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':blogId')
  @ApiOperation({
    summary:
      'Update information of an existing blog, user should be admin or writer',
  })
  async update(
    @Param('blogId') blogId: string,
    @Body() blogDto: BlogDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    return await this.blogService.update(blogId, blogDto, currentUser);
  }

  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete(':blogId')
  @ApiOperation({ summary: "Delete a blog by its id, It's for admins" })
  async delete(@Param('blogId') blogId: string): Promise<void> {
    await this.blogService.delete(blogId);
  }
}
