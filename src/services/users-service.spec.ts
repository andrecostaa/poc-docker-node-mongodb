import UsersService from "./users-service";
import UsersRepositoryInterface from "../repositories/interfaces/users-repository-interface";

describe("UsersService", () => {
  const mockRepository: UsersRepositoryInterface = {
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call repository.save with name and email", async () => {
    (mockRepository.save as jest.Mock).mockResolvedValue(true);

    const service = new UsersService(mockRepository);
    const result = await service.registerUser({
      name: "João",
      email: "joao@test.com",
    });

    expect(mockRepository.save).toHaveBeenCalledWith("João", "joao@test.com");
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: true });
  });

  it("should propagate error when repository.save fails", async () => {
    const error = new Error("Error in database");
    (mockRepository.save as jest.Mock).mockRejectedValue(error);

    const service = new UsersService(mockRepository);

    await expect(
      service.registerUser({ name: "João", email: "joao@test.com" }),
    ).rejects.toThrow("Error in database");
  });
});
