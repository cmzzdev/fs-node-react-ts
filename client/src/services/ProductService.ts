import axios from "axios";
import { coerce, number, parse, safeParse } from "valibot";
import { toBoolean } from "../utils/index";
import {
  DraftProductSchema,
  ProductsSchema,
  Product,
  ProductSchema,
  AvailabiltySchema,
} from "../types";

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

export async function getProductById(id: Product["id"]) {
  const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
  try {
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Data no valid on getProductById");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const numberSchema = coerce(number(), Number);
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(numberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductAvailability(data: ProductData) {
  try {
    const id = +data.id;
    const availability = !toBoolean(data.availability.toString());
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const result = safeParse(AvailabiltySchema, {
      id,
      availability,
    });
    if (result.success) {
      await axios.patch(url, result.output);
    }
  } catch (error) {
    console.log(error);
  }
}
