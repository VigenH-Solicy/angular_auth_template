import { Request, Response } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';
import fs from 'fs';
import { responseSender } from '../utils/response/response-sender';
import { HttpStatus } from '../utils/constants/http-status';

const uploadDirectory = path.join(__dirname, '..', 'uploads');
const publicDirectory = path.join(__dirname, '..', 'public');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload: Multer = multer({ storage: storage });

export const fileUpload = (req: Request, res: Response) => {
  upload.single('file')(req, res, (err: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (req.file) {
        const uploadedFilePath = path.join(uploadDirectory, req.file.filename);
        const targetFilePath = path.join(publicDirectory, req.file.filename);

        fs.rename(uploadedFilePath, targetFilePath, (moveErr) => {
          if (moveErr) {
            console.error(moveErr);
            res.status(500).json({ error: 'File upload failed' });
          } else {
            responseSender(res, 'File uploaded successfully', HttpStatus.OK, req.file?.filename);
          }
        });
      } else {
        res.status(500).json({ error: 'File not uploaded' });
      }
    }
  });
};
