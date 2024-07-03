import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import CheckoutSteps from '../features/checkoutSteps/checkoutSteps';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCart } from '../slices/cartSlice';
import Loader from '../features/loader/loader';

const PlaceOrder = () =>{
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    useEffect(() => {
        if(!cart.shippingAddress.streetAddress){
            navigate('/checkout');
        }
        else if(!cart.paymentMethod){
            navigate('/payment');
        }

    }, [cart.paymentMethod, cart.shippingAddress.streetAddress, navigate]);

    
    return (<>
    <CheckoutSteps currentStep = '4' />
    <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="mb-4">
                <h3 className="font-semibold">Shipping Address</h3>
                <p>{cart.shippingAddress.fullName}</p>
                <p>{cart.shippingAddress.streetAddress}</p>
                <p>{`${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}</p>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold">Payment Method</h3>
                <p>{cart.paymentMethod}</p>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold">Order Items</h3>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.product} className="flex justify-between">
                            <span>{item.name}</span>
                            <span>{`${item.qty} x $${item.price} = $${item.qty * item.price}`}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="lg:col-span-2">
            <main className="mx-auto my-8 px-4 py-4 max-w-7xl bg-white sm:px-0 sm:py-0 lg:px-8 border rounded-md">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 pt-8">
                Cart
              </h1>
              
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$262.00</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/pay"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay and Order
                  </Link>
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
    )
}

export default PlaceOrder;