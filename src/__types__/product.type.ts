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
  categoryId: number;
  subCategoryId: number;
  productVariants: IProductVariant[];
  showPromotion: number;
  video: string;
  images: File[];
  detail: string;
}

export interface IProductVariant {
  size: number;
  color: number;
  price: number;
  inventory: number;
}
