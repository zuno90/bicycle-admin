export enum ENotificationType {
  info = "info",
  success = "success",
  error = "error",
  warning = "warning",
}

export interface INotification {
  title: string;
  body: string;
}
