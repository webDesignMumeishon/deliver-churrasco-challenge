export interface GetProductsResult {
  list: IProducts;
}

export interface IProducts {
  products: Array<IProduct>;
}

export interface IProduct {
  SKU?: string;
  code?: number | null;
  name?: string;
  description?: null | string;
  pictures: string[];
  price?: number;
  currency?: ECurrency;
  sku?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum ECurrency {
  USD = 'USD',
  EUR = 'EUR',
  PEN = 'PEN'
}

export interface IProductInput {
  sku: string
  code: number
  name: string
  price: number
}