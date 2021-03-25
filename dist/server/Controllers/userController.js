"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.allUsers = void 0;
var user_1 = __importDefault(require("../models/user"));
var allUsers = function (_req, res) {
    var users = user_1["default"].find(function (err, users) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(users);
        }
    });
    console.log(users);
};
exports.allUsers = allUsers;
/*
export const showUser = (req: Request, res: Response) => {
  const user = User.findById(req.params.id, (err: any, user: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

export const addUser = (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

*/ 
