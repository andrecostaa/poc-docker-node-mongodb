import { Request, Response, NextFunction } from "express";
import UsersService from "../services/users-service";
import { RegisterUsersSchema } from "../shared/validations/register-users-schema";

export const createRegisterUser =
  (usersService: UsersService) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email } = req.body as RegisterUsersSchema;
      const response = await usersService.registerUser({ name, email });

      res.status(201).redirect(`/?success=${response.success}`);
    } catch (error) {
      next(error);
    }
  };
