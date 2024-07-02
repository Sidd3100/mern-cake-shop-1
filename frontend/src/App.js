import './App.css';
import Cart from './features/cart/Cart';
import ProductDetails from './features/product/components/ProductDetails';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';

import { Home } from './pages/Home';
import LoginPage from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import PrivateRoute from './pages/PrivateRoute';
import { Outlet } from 'react-router-dom';
import Navbar from './features/navbar/Navbar';
import Footer from './features/common/Footer';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (<Home />),
//   },
//   {
//     path: "/login",
//     element: (<LoginPage />),
//   },
//   {
//     path: "/register",
//     element: (<SignupPage />),
//   },
//   {
//     path: "/cart",
//     element: (<CartPage/>),
//   },
  
//   {
//     path: "/product-detail/:id",
//     element: (<ProductDetailsPage/>),
//   },
//   {
//     path: "/checkout",
//     element: (
//       <PrivateRoute>
//         <Checkout />
//       </PrivateRoute>
//     ),
//   },
// ]);

function App() {
  return (
    <div className="App">
      <Navbar>
        <Outlet />
      </Navbar>
      <Footer/>
    </div>
  );
}

export default App;
