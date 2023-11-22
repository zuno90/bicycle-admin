export enum EProductStatus {
  all = "Tất cả",
  active = "Đang hoạt động",
  inactive = "Đang ẩn",
}

export interface IProduct {
  id: number;
  categoryId: number;
  subCategoryId: number;
  name: string;
  nameOriginal: string;
  slug: string;
  discount: number;
  productItem: IProductItem[];
  sold: number;
  images: string[];
  video: string;
  detail: string;
  statusDisplay: boolean;
  status: keyof typeof EProductStatus;
  createAt: Date;
  updateAt: Date;
}

export interface IProductItem {
  id: number;
  sizeId: number;
  color: number;
  price: number;
  inventory: number;
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
  id: number;
  sizeId: number;
  colorValue: string;
  price: number;
  inventory: number;
}
