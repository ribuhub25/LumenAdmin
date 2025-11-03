export interface IDiscount {
  id: number;
  product_id: number;
  type: string;
  value: number;
  date_start: Date;
  date_end: Date;
}
