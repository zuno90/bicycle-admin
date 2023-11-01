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

export interface IOrderLine {
  id: number;
  orderId: number;
  productVariantId: number;
  sizeValue: number;
  colorValue: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  id: number;
  orderCode: string;
  productVariant: any;
  orderLines: IOrderLine[];
  status: keyof typeof EOrderStatus;
  totalPrice: number;
}
