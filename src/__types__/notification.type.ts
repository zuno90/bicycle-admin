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

export interface IUnreadNotification {
  id: number;
  code: string;
  content: string;
  title: string;
  type: "topup" | "other";
  isRead: boolean;
  createAt: Date;
  updateAt: Date;
}
