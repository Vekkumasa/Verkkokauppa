import express, { Response, Request } from 'express';
import Image from '../models/image';
import upload from '../utils/Multer';
import fs from 'fs';
import path from 'path';

import { CustomRequest } from '../types';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  void Image.find({}, (err, items) => {
    if (err) {
      console.log('Error imageissa: ', err);
    } else {
      console.log('router get:', items[0]);
      res.status(201).send(items[0]);
    }
  });
});

router.post('/', upload.single('image'), (req: CustomRequest<File>, res) => {
 
  console.log('request', req.body);
  console.log('request file', req.file);
  const obj = {
      img: {
          data: fs.readFileSync(path.join(__dirname+'../../../Uploads/' + req.file.filename)),
          contentType: 'image/png'
      }
  };

  console.log('obj:', obj);
  Image.create(obj, (err, item) => {
      if (err) {
          console.log('ERRORIA PUSKEE',   err);
      }
      else {
          void item.save();
          res.redirect('/');
      }
  });
});

export default router;