class HttpErrors extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message || "Something went wrong";
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request") {
    return new HttpErrors(400, message);
  }

  static unauthorized(message = "Unauthorized") {
    return new HttpErrors(401, message);
  }

  static notFound(message = "Not Found") {
    return new HttpErrors(404, message);
  }

  static internalServerError(message = "Internal Server Error") {
    return new HttpErrors(500, message);
  }
}

export default HttpErrors;
