export enum ETransaction {
  all = "Tất cả",
  pending = "Chờ xử lý",
  success = "Đã xác nhận",
  canceled = "Đã huỷ",
}

export interface ITransaction {
  id: number;
  userId: number;
  paymentCode: string;
  user: { name: string; phoneNumber: string };
  amount: number;
  content: string;
  status: keyof typeof ETransaction;
  type: string;
  createAt: Date;
  updateAt: Date;
}
