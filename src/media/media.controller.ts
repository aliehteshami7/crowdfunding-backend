import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { configService } from 'src/config.service';
import { getDiskStorage } from './disk-storage';
import { UploadImageRo } from './dto/upload-image.ro';
import { FileType, getFilter } from './file-type-filter';
import 'multer';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';

const appDir = join(dirname(require.main.filename), '..');
const imagePath = join(appDir, configService.getValue('IMAGE_PATH'));
const avatarPath = join(appDir, configService.getValue('AVATAR_PATH'));

@ApiTags('Media')
@Controller('media')
export class MediaController {
  @Get('image/:imageName')
  @ApiOperation({ summary: 'Get image by name' })
  getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const fileName = imageName.replace(/.([^.]*)$/, '_$1');
    const filePath = join(imagePath, fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Image Not Found!');
    }
    res.setHeader('Content-Type', 'image/*');
    createReadStream(filePath).pipe(res);
  }

  @Post('image/upload')
  @ApiOperation({ summary: 'Upload image' })
  @ApiCreatedResponse({ type: UploadImageRo })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: getFilter(FileType.IMAGE),
      storage: getDiskStorage(imagePath),
      limits: {
        fileSize: +configService.getValue('IMAGE_MAX_SIZE', false) || 5000000,
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): UploadImageRo {
    if (!file) {
      throw new BadRequestException('Image not found!');
    }
    const fileName = file.filename.replace(/_([^_]*)$/, '.$1');
    return plainToClass(UploadImageRo, {
      path: 'media/image/' + fileName,
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

  @Post('avatar/upload')
  @ApiOperation({ summary: 'Upload avatar' })
  @ApiCreatedResponse({ type: UploadImageRo })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: getFilter(FileType.IMAGE),
      storage: getDiskStorage(avatarPath),
      limits: {
        fileSize: +configService.getValue('AVATAR_MAX_SIZE', false) || 1000000,
      },
    }),
  )
  uploadAvatar(@UploadedFile() file: Express.Multer.File): UploadImageRo {
    if (!file) {
      throw new BadRequestException('Avatar not found!');
    }
    const fileName = file.filename.replace(/_([^_]*)$/, '.$1');
    return plainToClass(UploadImageRo, {
      path: 'media/avatar/' + fileName,
    });
  }
}
