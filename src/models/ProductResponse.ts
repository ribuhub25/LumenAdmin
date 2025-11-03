export interface ProductResponse {
  id: number;
  created_at: string;
  name: string;
  price: number;
  rating: number;
  review_count: number;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  status: number;
  brand_id: number;
  stock: number;
  long_description: string;
  features: string;
}