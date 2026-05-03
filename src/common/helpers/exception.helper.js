import { statusCodes } from "./status-code.helper.js"

//400
export class BadRequestException extends Error {
  code = statusCodes.BAD_REQUEST;
  name = "BadRequestException";
  constructor (message = "BadRequestException"){
    //call base class constructor
    super(message);
  }
}

//401
export class UnAuthoziedException extends Error {
  code = statusCodes.UNAUTHORIZED;
  name = "UnAuthorizedException";
  constructor (message = "UnAuthorizedException"){
    super(message);
  }
}

//403 front end will call refresh-token when encounter this 
export class ForbiddenException extends Error {
  code = statusCodes.FORBIDDEN;
  name = "ForbiddenException";
  constructor (message = "ForbiddenException"){
    super(message);
  };
}

//404 Not Found
export class NotFoundException extends Error {
  code = statusCodes.NOT_FOUND;
  name = "NotFoundError";
  constructor (message = "NotFoundException"){
    super(message);
  };
}