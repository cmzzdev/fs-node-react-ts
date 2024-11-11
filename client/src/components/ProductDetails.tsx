import { Product } from "../types/index";
import { formatCurrency } from "../utils/index";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const isAvailable = product.availability;
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {isAvailable ? "Yes" : "No"}
      </td>
      <td className="p-3 text-lg text-gray-800 "></td>
    </tr>
  );
}
