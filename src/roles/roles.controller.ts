import {
  Body,
  Controller,
  Delete,
  Inject,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { RolesService } from './roles.service';
import { RoleRo } from './dto/role.ro';
import { RoleIdDto } from './dto/role-id.dto';
import { RolesRo } from './dto/roles.ro';
import { UpdateRoleDto } from './dto/role-update.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common';
import { PermissionViewRo } from './dto/permission-view.ro';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    @Inject(RolesService) private readonly rolesService: RolesService,
  ) {}

  @Get('permissions')
  @ApiOperation({ summary: 'Get all permissions' })
  async readPermissions(): Promise<PermissionViewRo[]> {
    return await this.rolesService.readPermissions();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new role' })
  async createRole(@Body() roleDto: RoleDto): Promise<RoleRo> {
    return await this.rolesService.createRole(roleDto);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update information of an existing role' })
  async updateRole(@Body() updateRoleDto: UpdateRoleDto): Promise<void> {
    return await this.rolesService.updateRole(updateRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all or a role' })
  async readRole(@Query() roleIdDto: RoleIdDto): Promise<RoleRo | RolesRo> {
    if (!!roleIdDto.id) {
      return await this.rolesService.readRole(roleIdDto);
    }
    return await this.rolesService.findRole({});
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a role by its id' })
  async deleteRole(@Body() roleIdDto: RoleIdDto): Promise<void> {
    return await this.rolesService.deleteRole(roleIdDto);
  }
}
