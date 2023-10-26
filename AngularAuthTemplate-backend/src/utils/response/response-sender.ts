import { Response } from "express";
import { HttpStatus } from "../constants/http-status";

export const responseSender = <T>(
  res: Response,
  message: string,
  status: HttpStatus,
  data?: T
) => {
  if (status !== HttpStatus.OK && status !== HttpStatus.CREATED) {
    res
      .status(status)
      .json({ data: { messages: message, code: status, data: null } });
  } else {
    res.json({ data: { message: message, code: status, data: data } });
  }
};
