import nodemailer from "nodemailer";
import { Email } from '../types';

const main = (message: Email) => {

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPW
    }
  });

  transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
      
  });
};

export default main;