export interface ProductDTO {
  id: number;
  created_at: Date;
  name: string;
  price: number;
  rating: number;
  review_count: number;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  discount: number;
  status: number;
  brand_Id: number;
  stock: number;
  brand_name: string;
  code: string;
  final_price: number;
  is_new: boolean;
  categories: Array<object>;
}
