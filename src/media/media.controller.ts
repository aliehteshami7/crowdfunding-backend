import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { extname, dirname, join } from 'path';
import { configService } from 'src/config.service';
import { getDiskStorage } from './disk-storage';
import { UploadMediaRo } from './dto/upload-media.ro';
import { extNames, FileType, getFilter } from './file-type-filter';
import 'multer';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import * as fs from 'fs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/schemas/user.schema';

const appDir = join(dirname(require.main.filename), '..');
const mediaPath = join(appDir, configService.getMediaPath());
const avatarPath = join(appDir, configService.getAvatarPath());

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  @Get(':mediaName')
  @ApiOperation({ summary: 'Get media by name' })
  getMedia(@Param('mediaName') mediaName: string, @Res() res: Response) {
    const fileName = mediaName.replace(/.([^.]*)$/, '_$1');
    const filePath = join(mediaPath, fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Media Not Found!');
    }
    const ext = extname(mediaName);
    if (extNames[FileType.IMAGE].includes(ext)) {
      res.setHeader('Content-Type', 'image/*');
    } else {
      res.setHeader('Content-Type', 'video/*');
    }
    createReadStream(filePath).pipe(res);
  }

  @Post()
  @ApiOperation({ summary: 'Upload media' })
  @ApiCreatedResponse({ type: UploadMediaRo })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: getFilter(FileType.MEDIA),
      storage: getDiskStorage(mediaPath),
      limits: {
        fileSize: +configService.getValue('MEDIA_MAX_SIZE', false) || 5000000,
      },
    }),
  )
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  uploadFile(@UploadedFile() file: Express.Multer.File): UploadMediaRo {
    if (!file) {
      throw new BadRequestException('File not found!');
    }
    const fileName = file.filename.replace(/_([^_]*)$/, '.$1');
    return plainToClass(UploadMediaRo, {
      path: 'media/' + fileName,
    });
  }

  @Get('avatar/:avatarName')
  @ApiOperation({ summary: 'Get avatar by name' })
  getAvatar(@Param('avatarName') avatarName: string, @Res() res: Response) {
    const fileName = avatarName.replace(/.([^.]*)$/, '_$1');
    const filePath = join(avatarPath, fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Avatar Not Found!');
    }
    res.setHeader('Content-Type', 'image/*');
    createReadStream(filePath).pipe(res);
  }

  @Post('avatar')
  @ApiOperation({ summary: 'Upload avatar' })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: getFilter(FileType.IMAGE),
      storage: getDiskStorage(avatarPath),
      limits: {
        fileSize: +configService.getValue('AVATAR_MAX_SIZE', false) || 1000000,
      },
    }),
  )
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    if (!file) {
      throw new BadRequestException('Avatar not found!');
    }
    const fileName = file.filename.replace(/_([^_]*)$/, '.$1');
    await this.usersService.update({
      avatarAddress: fileName,
      username: currentUser.username,
    });
  }
}
