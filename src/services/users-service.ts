import { RegisterUsersRequestDto, RegisterUsersResponseDto } from "../dto";
import UsersRepositoryInterface from "../repositories/interfaces/users-repository-interface";

export default class UsersService {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  async registerUser(
    request: RegisterUsersRequestDto,
  ): Promise<RegisterUsersResponseDto> {
    const success = await this.usersRepository.save(
      request.name,
      request.email,
    );
    return { success };
  }
}
