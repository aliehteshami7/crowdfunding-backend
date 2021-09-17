import { BadRequestException } from '@nestjs/common';
import * as path from 'path';

export enum FileType {
  MEDIA = 'MEDIA',
  IMAGE = 'IMAGE',
  BIN = 'BIN',
  JSON = 'JSON',
}

export const extNames = {
  [FileType.MEDIA]: [
    '.png',
    '.jpg',
    '.gif',
    '.jpeg',
    '.mp4',
    '.mkv',
    '.webm',
    '.ogg',
    '.avi',
    '.mov',
    '.wmv',
    '.mpeg',
    '.mpg',
  ],
  [FileType.IMAGE]: ['.png', '.jpg', '.gif', '.jpeg'],
  [FileType.BIN]: ['.bin'],
  [FileType.JSON]: ['.json'],
};

export const getFilter = (fileType: FileType) => (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (!extNames[fileType].includes(ext)) {
    return callback(
      new BadRequestException(
        `Incorrect File Type: '${ext}' is not '${fileType}' file!`,
      ),
      false,
    );
  }
  callback(null, true);
};
