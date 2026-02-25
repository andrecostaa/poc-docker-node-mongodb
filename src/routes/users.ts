import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validateBody } from "../middlewares/validate-body";
import { registerUsersSchema } from "../shared/validations/register-users-schema";
import { createRegisterUser } from "../controllers/users-controller";
import UsersService from "../services/users-service";
import UsersRepository from "../repositories/users-repository";

const usersRouter = Router();
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const registerUser = createRegisterUser(usersService);

usersRouter.post(
  "/register",
  authMiddleware,
  validateBody(registerUsersSchema),
  registerUser,
);

export default usersRouter;
