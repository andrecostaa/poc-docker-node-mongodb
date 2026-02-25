export default interface UsersRepositoryInterface {
  save(name: string, email: string): Promise<boolean>;
}
