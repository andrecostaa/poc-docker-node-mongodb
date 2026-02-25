import mongoose from "mongoose";
import UsersRepository from "./users-repository";
import { User } from "../models/users";
import { DefaultError } from "../shared/exceptions";
import { StatusHttpEnum } from "../shared/enums";

jest.mock("../models/users");

describe("UsersRepository", () => {
  const mockUserCreate = User.create as jest.Mock;
  let repository: UsersRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new UsersRepository();
  });

  it("should return true when User.create succeeds", async () => {
    mockUserCreate.mockResolvedValue({});

    const result = await repository.save("João", "joao@test.com");

    expect(mockUserCreate).toHaveBeenCalledWith({
      name: "João",
      email: "joao@test.com",
    });
    expect(result).toBe(true);
  });

  it("should throw DefaultError 500 on Mongoose ValidationError", async () => {
    const validationError = new mongoose.Error.ValidationError();
    Object.assign(validationError, {
      errors: { email: { message: "Email inválido" } },
    });
    mockUserCreate.mockRejectedValue(validationError);

    await expect(repository.save("João", "invalid")).rejects.toThrow(
      DefaultError,
    );
    await expect(repository.save("João", "invalid")).rejects.toMatchObject({
      statusCode: StatusHttpEnum.INTERNAL_SERVER_ERROR,
    });
  });

  it("should throw DefaultError 500 on unknown errors", async () => {
    mockUserCreate.mockRejectedValue(new Error("Erro inesperado"));

    await expect(repository.save("João", "joao@test.com")).rejects.toThrow(
      DefaultError,
    );
    await expect(
      repository.save("João", "joao@test.com"),
    ).rejects.toMatchObject({
      message: "Erro ao registrar usuário",
      statusCode: StatusHttpEnum.INTERNAL_SERVER_ERROR,
    });
  });
});
