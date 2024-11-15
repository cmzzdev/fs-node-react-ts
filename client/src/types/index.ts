import { object, string, number, boolean, Output, array } from "valibot";

export const DraftProductSchema = object({
  name: string(),
  price: number(),
});

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
});

export const AvailabiltySchema = object({
  id: number(),
  availability: boolean(),
});

export type Product = Output<typeof ProductSchema>;
export const ProductsSchema = array(ProductSchema);
