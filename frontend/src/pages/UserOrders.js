import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import Loader from '../features/loader/loader';
import { Link } from 'react-router-dom';

export default function UserOrders() {
  const dispatch = useDispatch();
  const {data: orders, isLoading, error} = useGetMyOrdersQuery();


  return (
    <>
    {isLoading ?(<Loader/>): error ? (error.message): (
            <>
            {orders.map((order) => (
                <div key={order._id}>
                  <div>
                    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                          Order # {order._id}
                        </h1>
                        <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                          Order Status : {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                        </h3>
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {order.orderItems.map((item) => (
                              <li key={item._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.href}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
        
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link to={`product-detail/${item._id}`}>{item.name}</Link>
                                      </h3>
                                      <p className="ml-4">${item.price}</p>
                                    </div>
                                   
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="text-gray-500">
                                      <label
                                        htmlFor="quantity"
                                        className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Qty :{item.qty}
                                      </label>
                                    </div>
        
                                    <div className="flex"></div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
        
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>$ {order.totalPrice}</p>
                        </div>
                        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                          <p>Total Items in Cart</p>
                          <p>{order.orderItems.length} items</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping Address :
                        </p>
                        <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                          <div className="flex gap-x-4">
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {order.shippingAddress.streetAddress}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {order.shippingAddress.city}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {order.shippingAddress.postalCode}
                              </p>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}</>
        ) }
    </>
        
      
      
   
  );
}
