export interface IProduct {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: 1;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  shippingInformation: string;
  sku: string;
  stock: number;
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}
interface IAllProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
interface IDeleteProductResponse extends IProduct {
  isDeleted: boolean;
  deletedOn: string;
}
export interface IProductCategory {
  slug: string;
  name: string;
  url: string;
}

export async function getAllProducts(
  page: number
): Promise<IAllProductsResponse> {
  const response = await fetch(
    `https://dummyjson.com/products?limit=20&skip=${page}`
  );
  if (!response.ok) throw new Error("");
  return response.json();
}

export async function getAllProductsCategories(): Promise<IProductCategory[]> {
  const response = await fetch("https://dummyjson.com/products/categories");
  return response.json();
}

export async function getAllProductsByCategory(
  url: string
): Promise<IAllProductsResponse> {
  const response = await fetch(url);
  return response.json();
}
export async function deleteProduct(
  id: number
): Promise<IDeleteProductResponse> {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
