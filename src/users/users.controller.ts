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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRoleDto } from './dto/user-role.dto';
import { UserRolesService } from './user-roles.service';
import { CheckPermissionDto } from './dto/checkPermission.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserRo> {
    return await this.userService.create(userCreateDto);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Body() userUpdateDto: UserUpdateDto): Promise<void> {
    return await this.userService.update(userUpdateDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async find(@Query() userFindDto: UserFindDto): Promise<UsersRo> {
    return await this.userService.find(userFindDto);
  }

  @Post('suspend')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async suspend(@Body() usernameDto: UsernameDto): Promise<void> {
    return await this.userService.suspend(usernameDto);
  }

  @Post('activate')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async activate(@Body() usernameDto: UsernameDto): Promise<void> {
    return await this.userService.activate(usernameDto);
  }

  @Post('role')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async assignRole(@Body() userRoleDto: UserRoleDto): Promise<void> {
    return await this.userRolesService.assignRole(userRoleDto);
  }

  @Post('checkPermissoin')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async checkPermission(
    @Body() checkPermissionDto: CheckPermissionDto,
  ): Promise<void> {
    return await this.userRolesService.checkPermission(checkPermissionDto);
  }
}
