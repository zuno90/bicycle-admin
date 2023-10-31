export enum ETransaction {
  all = "Tất cả",
  waiting_payment = "Chờ xử lý",
  transported = "Đã xác nhận",
  canceled = "Đã huỷ",
}

export interface ITransaction {
  id: number;
}
