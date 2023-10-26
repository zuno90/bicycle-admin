export interface IProductTable {
  id: number;
  orderId: string;
  date: Date;
  name: string;
  value: number;
  status: string;
}

export enum EProductStatus {
  all = "all",
  active = "active",
  inactive = "inactive",
}

export interface IProductInput {
  name: string;
  category: number;
  size: number;
  color: number;
  originalPrice: number;
  promotionPrice: number;
  inventory: number;
  images: File[];
  content: string;
}
