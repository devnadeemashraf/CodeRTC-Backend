export enum COOKIES {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  UPGRADE_REQUIRED = 426,
  TOO_MANY_REQUESTS = 429,

  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export enum HTTP_RESPONSE {
  OK = "Success",
  CREATED = "Successfully Created",
  ACCEPTED = "Accepted",

  BAD_REQUEST = "Bad Request",
  UNAUTHORIZED = "Unauthorized",
  PAYMENT_REQUIRED = "Payment is required",
  FORBIDDEN = "This content is forbidden",
  NOT_FOUND = "Content you're looking is not found",
  METHOD_NOT_ALLOWED = "Method is not allowed",
  NOT_ACCEPTABLE = "Not Acceptable",
  REQUEST_TIMEOUT = "Request Timed out",
  CONFLICT = "Conflicting With Existing Content",
  UPGRADE_REQUIRED = "An Upgrade is required",
  TOO_MANY_REQUESTS = "Too Many Requests",

  INTERNAL_SERVER_ERROR = "Internal Server Error",
  BAD_GATEWAY = "Bad Gateway",
  SERVICE_UNAVAILABLE = "Service Temporarily Unavailable",
}
