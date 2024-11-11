import axios from "axios";
import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema } from "../types";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  const url = `${import.meta.env.VITE_API_URL}/api/products`;
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const bodyPost = {
        name: result.output.name,
        price: result.output.price,
      };
      await axios.post(url, bodyPost);
    } else {
      throw new Error("Data no valid on addProduct");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  const url = `${import.meta.env.VITE_API_URL}/api/products`;
  try {
    const { data } = await axios.get(url);
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Data no valid on getProducts");
    }
  } catch (error) {
    console.log(error);
  }
}
