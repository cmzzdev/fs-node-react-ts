import axios from "axios";
import { safeParse } from "valibot";
import { DraftProductSchema } from "../types";

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
      throw new Error("Data no valid");
    }
  } catch (error) {
    console.log(error);
  }
}
