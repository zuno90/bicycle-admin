export enum EVoucherStatus {
  all = "Tất cả",
  upcoming = "Sắp diễn ra",
  ongoing = "Đang hoạt động",
  inactive = "Ngừng hoạt động",
}

export interface IVoucher {
  id: number;
  code: string;
  title: string;
  detail: string;
  startDate: Date;
  endDate: Date;
  unit: string;
  value: number;
  quantity: number;
  status: keyof typeof EVoucherStatus;
  statusDisplay: boolean;
}

export interface IVoucherInput {
  name: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  code: string;
  quantity: number;
}
