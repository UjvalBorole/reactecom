import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AllProduct from "./Pages/AllProduct"
import Cart from "./Pages/Cart"
import Orders from "./Pages/Orders"
import CheckOut from "./Pages/CheckOut"
import SignIn from "./Pages/Authentication/SignIn"
import Signup from "./Pages/Authentication/Signup"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./Pages/Home";
import Test from "./Test";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/HomeComponents/EditProfile";
import Admin from "./Pages/Admin/Admin";
import ProductDetail from "./Pages/ProductDetail";
import { Context } from "./Context/Context";
import Payment from "./Pages/Payment";
import EditAdmin from "./Pages/Admin/EditAdmin";
import Orders2 from "./Pages/Orders2";
import Wishlist from "./Pages/WishList";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/product-type/mobile",
        element: <AllProduct type={'Mobile'}/>,
      },
      {
        path: "/product-type/laptop",
        element: <AllProduct type={'Laptop'}/>,
      },
      {
        path: "/product-type/camera",
        element: <AllProduct type={'Camera'}/>,
      },
      {
        path: "/product-type/watch",
        element: <AllProduct type={'Watch'}/>,
      },
      {
        path: "/product-type/headphone",
        element: <AllProduct type={'Headphone'}/>,
      },
      
      {
        path: "cart",
        element: <Cart/>,
      },
      {
        path: "/product/:id/:name",
        element: <ProductDetail/>,
      },
      {
        path: "/orders",
        element: <Orders/>,
      },
      {
        path: "/order/:id",
        element: <Orders2/>,
      },
      {
        path: "/cart/checkout",
        element: <CheckOut/>,
      },
      {
        path: "test",
        element: <Test/>,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "profile/editprofile/:id",
        element: <EditProfile/>,
      },
      {
        path: "/admin",
        element: <Admin/>,
      },
      {
        path: "/adminedit/:id",
        element: <EditAdmin/>,
      },
      {
        path: "payment",
        element: <Payment/>,
      },
      {
        path: "/wishlist/:id",
        element: <Wishlist/>,
      },
      
      {
        path: "signin",
        element: <SignIn/>,
      },
      {
        path: "signup",
        element: <Signup/>,
      },
    ]
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Context>
    <RouterProvider router={router} />
    </Context>
  </React.StrictMode>
);

reportWebVitals();
