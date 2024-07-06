import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import PrivateRoute from './pages/PrivateRoute';

import { Provider } from 'react-redux';
import store  from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
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
import App from "./App";
import Payment from "./features/payment/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import OrderDetailsPage from "./pages/OrderDetails";

import {PayPalScriptProvider} from '@paypal/react-paypal-js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index={true} path ='/' element={<Home/>}/>
      <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<SignupPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/product-detail/:id" element={<ProductDetailsPage />} />
    <Route path="" element={<PrivateRoute/>}>
    <Route path="/checkout" element={<Checkout/>}/>
    <Route path="/payment" element={<Payment/>}/>
    <Route path='/placeorder' element={<PlaceOrder/>}/>
    <Route path='/order/:id' element={<OrderDetailsPage/>}/>
    </Route>
    </Route>,
    
   
  )
);


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (<App/>),
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


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading = {true}>
    <RouterProvider router={router} />
    <ToastContainer/>
    </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
