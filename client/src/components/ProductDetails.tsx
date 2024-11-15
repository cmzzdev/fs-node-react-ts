import {
  useNavigate,
  Form,
  ActionFunctionArgs,
  redirect,
  useFetcher,
} from "react-router-dom";
import { Product } from "../types/index";
import { formatCurrency } from "../utils/index";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="availability"
            value={product.availability.toString()}
            className={`${
              isAvailable ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-xs font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {isAvailable ? "Available" : "Not available"}
          </button>
          <input type="hidden" name="id" value={product.id} />
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`products/${product.id}/edit`)}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Edit
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm(`Are you sure to remove ${product.name}?`)) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Remove"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
