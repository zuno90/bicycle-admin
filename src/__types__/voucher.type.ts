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
  thumbnail: string;
  fromPrice: number;
  unit: "%" | "cash";
  value: number;
  status: keyof typeof EVoucherStatus;
}

export interface IVoucherInput {
  name: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  code: string;
  quantity: number;
}
