/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Response, Request } from 'express';
import Image from '../models/image';
import upload from '../utils/Testi';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  void Image.find({}, (err, items) => {
    if (err) {
      console.log('Error imageissa: ', err);
    } else {
      items.map(item => {
        console.log('item', item);
      });
      res.status(201).send(items[0].img);
    }
  });
});


router.post('/', upload.single('image'), (req: Request, res: Response) => {
 
  console.log('request', req.body);
  
  const obj = {
      name: req.body.name,
      desc: req.body.desc,
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