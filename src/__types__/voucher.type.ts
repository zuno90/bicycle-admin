export enum EVoucherStatus {
  all = "Tất cả",
  upcoming = "Sắp diễn ra",
  ongoing = "Đang hoạt động",
  inactive = "Ngừng hoạt động",
}

export enum EDiscountType {
  "cash" = "cash",
  "%" = "%",
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
  title: string;
  detail: string;
  unit: string;
  code: string;
  value: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
}
