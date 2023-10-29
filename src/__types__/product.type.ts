export enum EProductStatus {
  all = "Tất cả",
  active = "Đang hoạt động",
  inactive = "Đang ẩn",
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
  size: { id: number; title: string; value: string };
  color: number;
  price: number;
  inventory: number;
}
