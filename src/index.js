import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import CartList from "./components/CartList";
import Payment from "./components/Payment";
import MyOrders from "./components/MyOrders";
import OrderDetails from "./components/OrderDetails";
import ProductDetail from "./components/ProductDetails";
import CustomerLedger from "./components/CustomerLedger";
import AdminBook from "./AdminBook";
import AboutUs from "./components/AboutUs";
// import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "details/:id", element: <ProductDetail /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "update/:id", element: <UpdateProduct /> },
      { path: "mycart", element: <CartList /> },
      { path: "payment", element: <Payment /> },
      { path: "myorders", element: <MyOrders /> },
      { path: "order-details", element: <OrderDetails /> },
      { path: "admin-ledger", element: <AdminBook /> },
      { path: "customer-ledger", element: <CustomerLedger /> },
      { path: "about", element:  <AboutUs/>},
      // { path: "footer", element:  <Footer/>}
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
