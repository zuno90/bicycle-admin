export enum EPaymentType {
  pay_order = "pay_order",
  topup = "topup",
}

export interface IPayment {
  id: number;
  type: EPaymentType;
  amount: number;
  content: string;
  userId: number;
  createAt: Date;
  updateAt: Date;
}
