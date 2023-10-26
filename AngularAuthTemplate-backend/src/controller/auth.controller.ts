import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.schema";
import { responseSender } from "../utils/response/response-sender";
import { valueTrimmer } from "../utils/value-trimmer/value-trimmer";
import { HttpStatus } from "../utils/constants/http-status";
import {
  bcryptPassword,
  comparePasswords,
} from "../utils/password-converter/password-converter";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = valueTrimmer(req.body);
    const hashedPassword = await bcryptPassword(body.password);
    if (!hashedPassword) {
      responseSender(
        res,
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    const token = jwt.sign(body, "auth-template", { expiresIn: "1h" });
    body.password = hashedPassword;
    body.jwt = token;
    (req.session as any).jwt = token;
    const isUserExist = await User.findOne({ email: body.email });
    if (isUserExist) {
      responseSender(
        res,
        "User already exists",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
      return;
    }
    const result = await new User(body).save();
    if (!result) {
      responseSender(
        res,
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    responseSender(res, "Sign up gone successfully", HttpStatus.OK, token);
  } catch (error: any) {
    responseSender(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const body = valueTrimmer(req.body);
  const findUser = await User.findOne({ email: body.email });
  if (findUser) {
    const matchPasswords = await comparePasswords(
      body.password,
      findUser.password
    );
    if (matchPasswords) {
      const token = jwt.sign(
        { userId: findUser._id, email: findUser.email },
        "auth-template",
        { expiresIn: "1h" }
      );
      (req.session as any).token = token;
      responseSender(res, "Sign in gone sucessfully", HttpStatus.OK, token);
    } else {
      responseSender(
        res,
        "Invalid email or password",
        HttpStatus.BAD_REQUEST
      );
    }
  } else {
    responseSender(res, "No user found", HttpStatus.INTERNAL_SERVER_ERROR);
  }
};
