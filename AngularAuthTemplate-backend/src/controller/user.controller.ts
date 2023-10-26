import { Request, Response } from "express";
import User from "../model/user.schema";
import { HttpStatus } from "../utils/constants/http-status";
import { responseSender } from "../utils/response/response-sender";

export const getUserByToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      responseSender(
        res,
        "something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    responseSender(res, "user data", HttpStatus.OK, user);
  } catch (error: any) {
    responseSender(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};
