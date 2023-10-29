export interface IVoucher {
  id: number;
  code: string;
  title: string;
  thumbnail: string;
  fromPrice: number;
  unit: "%" | "cash";
  value: number;
  status: boolean;
  statement: EVoucherStatement;
}

enum EVoucherStatement {
  BEFORE = "Sắp diễn ra",
  ACTIVE = "Đang hoạt động",
  INACTIVE = "Ngừng hoạt động",
}

export interface IVoucherInput {
  name: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  code: string;
  quantity: number;
}
