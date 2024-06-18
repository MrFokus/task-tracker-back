import { extname } from 'path';
import { Buffer } from 'buffer';

export const editFileName = (req, file, callback) => {
  const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
  const name = originalName.split('.')[0];
  const fileExtName = extname(originalName);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
