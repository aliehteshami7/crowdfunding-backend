import { UserFindDto } from './dto/user-find.dto';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersRo } from './dto/users.ro';
import { UsernameDto } from './dto/username.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserRo } from './dto/user.ro';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserRoleDto } from './dto/user-role.dto';
import { UserRolesService } from './user-roles.service';
import { CheckPermissionDto } from './dto/checkPermission.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { PermissionTag } from 'src/roles/enum/permission-tag.enum';
import { Permissions } from 'src/roles/decorators/permissions.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './schemas/user.schema';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,

    @Inject(UserRolesService)
    private readonly userRolesService: UserRolesService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create a new user,  It's for admins" })
  @ApiCreatedResponse({ type: UserRo })
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserRo> {
    return await this.userService.create(userCreateDto);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Upadate infomation of an existing user, It's for admins",
  })
  async update(@Body() userUpdateDto: UserUpdateDto): Promise<void> {
    return await this.userService.update(userUpdateDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Search users,  It's for admins" })
  @ApiOkResponse({ type: UsersRo })
  async find(@Query() userFindDto: UserFindDto): Promise<UsersRo> {
    return await this.userService.find(userFindDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ type: UserRo })
  async userProfile(@CurrentUser() currentUser: User): Promise<UsersRo> {
    return await this.userService.find({
      ...new UserFindDto(),
      username: currentUser.username,
    });
  }

  @Post('suspend')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Suspend an user by username,  It's for admins" })
  async suspend(@Body() usernameDto: UsernameDto): Promise<void> {
    return await this.userService.suspend(usernameDto);
  }

  @Post('activate')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Activate an user by username,  It's for admins" })
  async activate(@Body() usernameDto: UsernameDto): Promise<void> {
    return await this.userService.activate(usernameDto);
  }

  @Post('role')
  @ApiBearerAuth()
  // @UseGuards(PermissionsGuard)
  // @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Assign roles to an user,  It's for admins" })
  async assignRole(@Body() userRoleDto: UserRoleDto): Promise<void> {
    return await this.userRolesService.assignRole(userRoleDto);
  }

  @Post('checkPermission')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionTag.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Check permissions of an user,  It's for admins" })
  async checkPermission(
    @Body() checkPermissionDto: CheckPermissionDto,
  ): Promise<void> {
    return await this.userRolesService.checkPermission(checkPermissionDto);
  }
}
