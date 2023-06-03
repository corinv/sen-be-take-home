import { ApplicationError } from "../middleware/errors.js";
import HttpStatusCode from "../utils/httpStatusCode.enum.js";
export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super(
      "Provided email and password do not match",
      "InvalidCredentialsError",
      HttpStatusCode.UNAUTHORIZED
    );
  }
}

export class UserDoesNotExistError extends ApplicationError {
  constructor() {
    super(
      "Could not retrieve specified user",
      "UserDoesNotExistError",
      HttpStatusCode.NOT_FOUND
    );
  }
}

export class EmailAlreadyTakenError extends ApplicationError {
  constructor() {
    super(
      "Provided email address is already in use",
      "EmailAlreadyTakenError",
      HttpStatusCode.CONFLICT
    );
  }
}
