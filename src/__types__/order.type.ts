export enum EOrderStatus {
  all = "Tất cả",
  waiting_payment = "Chờ thanh toán",
  pending = "Đang xử lí",
  transported = "Đang vận chuyển",
  success = "Đã giao",
  canceled = "Đã huỷ",
}

export enum EOrderStep {
  waiting_payment = "Chờ thanh toán",
  pending = "Đang xử lí",
  transported = "Đang vận chuyển",
  success = "Đã giao",
  canceled = "Huỷ đơn",
}

export interface IOrderProduct {
  name: string;
  slug: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  productId: number;
  productVariantId: number;
  totalPrice: number;
}

export interface IOrder {
  id: number;
  codeOrder: string;
  name: string;
  finalPrice: number;
  status: keyof typeof EOrderStatus;
  createAt: Date;
  updateAt: Date;
}

export interface IOrderDetail {
  id: number;
  codeOrder: string;
  products: IOrderProduct[];
  status: keyof typeof EOrderStatus;
  totalPrice: number;
  priceDelivery: number;
  pricePromotion: number;
  finalPrice: number;
}
