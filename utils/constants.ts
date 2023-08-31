export enum NOTIFICATION_MESSAGE {
  EMPTY_ACCESS_TOKEN = "Access Token is undefined",
  ALLOW_LOCATION_PERMISSION = "Please allow location permission in settings",
  LOGIN_MICROSOFT_ERROR = "Please try to login again.",
  NETWORK_ERROR = "There's network connection problem, please try again",
  UNEXPECTED_ERROR = "Unexpected Error",
}

export enum NOTIFICATION_VARIANT {
  SUCCESS = "success",
  WARNING = "warning",
  DANGEROUS = "error",
  INFO = "info",
}
