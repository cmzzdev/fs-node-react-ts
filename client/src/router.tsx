import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Products, {
  loader as productsLoader,
  action as updateAvailabilityAction,
} from "./pages/Products";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from "./pages/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityAction,
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "products/:id/edit",
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "products/:id/delete",
        action: deleteProductAction,
      },
    ],
  },
]);
