import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../features/loader/loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button } from '@material-tailwind/react'; // Assuming Button component is imported from your UI library
import { format } from 'date-fns';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useGetPayPalClientIdQuery, usePayOrderMutation } from '../slices/ordersApiSlice';
import { toast } from 'react-toastify';

export default function OrderDetailsPage() {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, isError } = useGetOrderDetailsQuery(orderId);
  const dispatch = useDispatch();

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{isPending}, paypalDispatch] = usePayPalScriptReducer(); 
  const {userInfo} = useSelector((state) => state.auth); 
  const {
    data: paypal,
    isLoading: loadingClientId,
    error: clientIdError  
  } = useGetPayPalClientIdQuery(); 
  
 useEffect(() => {
    if(!loadingClientId && !clientIdError && paypal.clientId){
      const loadPayPalScript = async () => {
        paypalDispatch({
            type: 'resetOptions',
            value: {
                'client-id': paypal.clientId,
                currency: 'USD' ,
            }
            });
            paypalDispatch({type: 'setLoadingStatus', value: 'pending'});
        }
        if(order && !order.isPaid){
            if(!window.paypal){
                loadPayPalScript();
            }
        } 
    }
},[order, paypal, paypalDispatch, loadingClientId, clientIdError ])

 function onApprove(data, actions){
    return actions.order.capture().then(async function(details){
        try {
            await payOrder({orderId, details});
            refetch();
            toast.success('Order paid successfully');
        } catch (err) {
            toast.error(err.message);
        }
    })
 }
 async function onApproveTest(){
    await payOrder({orderId, details: {payer: {}}});
            refetch();
            toast.success('Order paid successfully');
 }
 function onError(err){
    toast.error(err.message);
 }
 function createOrder(data, actions){
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: order.totalPrice,
                },
            },
        ],
    }).then((orderID) => {
        return orderID;
    })
 } 

  const handlePayment = () => {
    // Implement payment logic here
    alert('Implement payment logic'); // Placeholder for actual payment logic
  };

 

  return isLoading ?(<Loader/>):isError ?(
    <div className="mt-6">
    <Alert color="red">{isError}</Alert> // Display error if fetching orders fails
  </div>
  ):(
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Order {order._id}</h1>

        <div className="mt-6">
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Order ID: {order._id}</h2>
              <p className="text-sm text-gray-600">Placed on: {format(new Date(order.createdAt), 'MMMM dd, yyyy')}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-md font-medium text-gray-900">Order Items</h3>
              <ul className="mt-2">
                {order.orderItems.map((item) => (
                  <li key={item._id} className="flex justify-between items-center py-2 border-b border-gray-300">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex justify-between">
              <p className="text-sm font-medium text-gray-900">Total Price:</p>
              <p className="text-sm font-medium text-gray-700">Rs {order.totalPrice}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900">Status:</p>
              <p className="text-sm text-gray-700">
                {order.isDelivered ? (
                  <span className="text-green-600">Delivered</span>
                ) : (
                  <span className="text-yellow-600">Not Delivered</span>
                )}
              </p>
              <p className="text-sm text-gray-700">
                {order.isPaid ? (
                  <span className="text-green-600">Paid</span>
                ) : (
                  <span className="text-red-600">Not Paid</span>
                )}
              </p>
            </div>
            <div className="mt-4">
              {!order.isPaid && (
                <div>
                {loadingPay && <Loader/>}

                {isPending ? <Loader/> : (
                    <div>
                    <button
                    type="submit"
                    onClick={onApproveTest}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Test Pay Order
                  </button>
                  <div>
                    <PayPalButtons
                    createOrder = {createOrder}
                    onApprove = {onApprove}
                    onError = {onError}></PayPalButtons>
                  </div>
                  </div>

                )}

                
              </div>
             
             )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
