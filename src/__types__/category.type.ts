export interface ICategory {
  id: number;
  name: string;
  slug: string;
  subCategories: ISubCategory[];
  thumbnail: string;
  updateAt: Date;
  createAt: Date;
}

export interface ISubCategory {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  totalProduct?: number;
  updateAt: Date;
  createAt: Date;
}
