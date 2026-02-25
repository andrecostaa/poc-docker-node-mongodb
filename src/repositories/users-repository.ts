import { User } from "../models/users";
import { StatusHttpEnum } from "../shared/enums";
import { DefaultError } from "../shared/exceptions";
import UsersRepositoryInterface from "./interfaces/users-repository-interface";
import { logger } from "../shared/logger";

export default class UsersRepository implements UsersRepositoryInterface {
  async save(name: string, email: string): Promise<boolean> {
    try {
      await User.create({ name, email });
      return true;
    } catch (error) {
      logger.error({ err: error }, "Error saving user");
      throw new DefaultError(
        "Erro ao registrar usuário",
        StatusHttpEnum.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
