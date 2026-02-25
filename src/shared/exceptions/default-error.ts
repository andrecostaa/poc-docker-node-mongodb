import { StatusHttpEnum } from "../enums";

export class DefaultError extends Error {
  public readonly statusCode: StatusHttpEnum;

  constructor(message: string, status: StatusHttpEnum) {
    super(message);
    this.name = "DefaultError";
    this.statusCode = status;
    Object.setPrototypeOf(this, DefaultError.prototype);
  }
}
