import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {addToCart, removeFromCart} from "../../slices/cartSlice";


export default function Cart() {
  const [open, setOpen] = useState(true);
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({...product, qty}));

  }
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = ()=>{
    navigate('/login?redirect=/checkout');
  }

  console.log (cartItems);
  const selectedSize = cartItems.find((x) => x.sizes.name === cartItems.size);
  console.log(selectedSize)


  return (
    <>
      <main className="mx-auto my-8 py-4 max-w-7xl bg-white px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Shopping Cart
            </h1>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <Link
              to="/"
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Go back to home
            </Link>
          </div>
        ) : (<>
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems.map((product) => (
                <li key={product._id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.images.src}
                      alt={product.images.alt}
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
                      <p className="text-gray-500">Qty{" "}<span>{product.size} </span>
                        <select value = {product.qty} onChange={(e)=>{addToCartHandler(product,Number(e.target.value))}}>
                          {selectedSize && [...Array(selectedSize.countInStock).keys()].map((x)=>(
                            <option key={x+1} value={x+1}>{x+1}</option>
                          ))}
                        </select>
                      </p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => removeFromCartHandler(product._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal ({cartItems.reduce((acc,item) => acc+item.qty, 0)}) items</p>
            <p>Rs {cartItems.reduce((acc,item) => acc + item.qty*item.price, 0).toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            *Shipping and taxes included.
          </p>
          <div className="mt-6">
            <button type = 'button'
              onClick = {checkoutHandler}
              disabled={cartItems.length === 0}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </button>
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
        </>
        )}
      </main>
    </>
  );
}
