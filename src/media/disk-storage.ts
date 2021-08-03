import { extname } from 'path';
import { diskStorage } from 'multer';
import { pseudoRandomBytes } from 'crypto';

export const getDiskStorage = (dest: string) =>
  diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: function (req, file, cb) {
      pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err, '');
        const ext = extname(file.originalname).substring(1);
        cb(null, raw.toString('hex') + '_' + ext);
      });
    },
  });
