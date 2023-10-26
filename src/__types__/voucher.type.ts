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
