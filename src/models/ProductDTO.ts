import { ICategory } from "./CategoryDTO";

export interface IProduct {
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
  status: number;
  //brand: IBrand;
  brand_code: string,
  brand_id: number,
  brand_name: string,
  stock: number;
  long_description: string;
  features: string;
  disc_value: number,
  disc_active: boolean;
  disc_vigence_days: number;
  final_price: number;
  is_new: boolean;
  categories: ICategory[];
  quantity_sale: number;
  subtotal_sale: number;
  image: File | null; 
}

export const PRODUCT_INITIAL: IProduct = {
  id: 0,
  name: "",
  price: 0.0,
  final_price: 0.0,
  categories: [],
  rating: 0,
  review_count: 0,
  href: "",
  description: "",
  imageSrc:
    "https://demo.theme-sky.com/upstore-electronic/shop/crap-auctorin-default/",
  imageAlt: "",
  status: 0,
  created_at: new Date(),
  disc_value: 0,
  stock: 0,
  // brand: {
  //   id: 0,
  //   code: "without_brand",
  //   name: "sin marca",
  //   created_at: new Date
  // },
  brand_code: "",
  brand_id: 0,
  brand_name: "",
  is_new: false,
  long_description: "",
  features: "",
  disc_active: false,
  disc_vigence_days: 0,
  quantity_sale: 0,
  subtotal_sale: 0,
  image: null
};
