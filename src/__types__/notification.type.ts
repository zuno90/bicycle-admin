export enum ENotificationType {
  info = "info",
  success = "success",
  error = "error",
}

export interface INotification {
  title: string;
  body: string;
}
