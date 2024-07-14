import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../features/checkoutSteps/checkoutSteps';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
// import Loader from '../features/loader/loader';
// import { Alert } from "@material-tailwind/react";

const PlaceOrder = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading ,error}] = useCreateOrderMutation();
  const {shippingAddress:address} = cart;
 
  
  useEffect(() => {
    if (!cart.shippingAddress.streetAddress) {
      navigate('/checkout');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.streetAddress, navigate]);

  const placeOrderHandler = async () => {
    try {
      // const orderItems = cart.cartItems.map(item => ({
      //   name: item.name,
      //   qty: item.qty,
      //   href: item.href,
      //   price: item.price, // Keeping price as a string
      //   product: item._id
      // }));
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }).unwrap();
      console.log(res)
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.message || "Order placement failed");
    }
  }

  return (
    <>
      <CheckoutSteps currentStep='4' />
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
       
        <li key={address.email} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 bg-white border-gray-200 rounded-md">
          <div className="flex min-w-0 gap-x-4">
          <input
            name = "address"
                    type="radio"
                    checked
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
            
            <div className="min-w-0 flex-auto">
              
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.phone}</p>
              <p className="text-sm font-semibold leading-6 text-gray-900">{cart.paymentMethod}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 text-xs leading-5 text-gray-500">{address.streetAddress}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">{address.region}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">{address.postalCode}</p>
          
          </div>
        </li>
      
        <div className="mb-4">
          <h3 className="font-semibold">Order Items</h3>
          <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200 border-gray-700 bg-white rounded-md px-4">
              {cart.cartItems.map((product) => (
                <li key={product._id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.href}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/product/${product._id}`}>{product.name}</Link>
                        </h3>
                        <p className="ml-4">{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.message}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty{": "}<span>{product.qty} </span>
                      
                      </p>

                      
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
        <div className="lg:col-span-2">
          <main className="mx-auto my-8 px-4 py-4 max-w-7xl bg-white sm:px-0 sm:py-0 lg:px-8 border rounded-md">
            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 pt-8">
              Cart
            </h1> */}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated.
              </p>
              {/* {error && <Alert color="red">{error.message}</Alert>} */}
              {error && <p className="text-red-500">{error.message}</p>}   
              <div className="mt-6">
                <button
                  type='button'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Pay and Order
                </button>
                {/* {isLoading && <Loader />} */}
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default PlaceOrder;
