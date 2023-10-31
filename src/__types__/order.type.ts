export enum EOrderStatus {
  all = "Tất cả",
  waiting_payment = "Chờ thanh toán",
  pending = "Đang xử lí",
  transported = "Đang vận chuyển",
  success = "Đã giao",
  canceled = "Đã huỷ",
}

export enum EOrderStep {
  waiting_payment,
  pending,
  transported,
  success,
}

export interface IOrder {
  id: number;
}
