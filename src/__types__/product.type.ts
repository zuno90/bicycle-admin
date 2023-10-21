export interface IProductTable {
  id: number;
  orderId: string;
  date: Date;
  name: string;
  value: number;
  status: string;
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
