export class UserDoesNotHavePermissionError extends Error {
  constructor() {
    super(`User does not have permission for this functionality/route.`);
    this.name = "UserDoesNotHavePermissionError";
  }
}
