import React from "react";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../loader/loader";
import { Link } from "react-router-dom";
import Alert from "../alert/Alert";

const OrderList = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className="flex w-full flex-col gap-2">
                    <Alert color="red">{error.message || "Failed to load orders"}</Alert>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">ID</th>
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">USER</th>
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">DATE</th>
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">TOTAL</th>
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">PAID</th>
                                <th className="px-4 py-2 border-b-2 border-gray-200 text-center text-sm font-semibold text-gray-600">DELIVERED</th>
                                <th className="px-4 py-2 border-b-2 border-gray-200"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">{order._id}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">{order.user && order.user.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">${order.totalPrice.toFixed(2)}</td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                                        {order.isPaid ? new Date(order.paidAt).toLocaleDateString() : <span className="text-red-500">✘</span>}
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                                        {order.isDelivered ? new Date(order.deliveredAt).toLocaleDateString() : <span className="text-red-500">✘</span>}
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                                        <Link to={`/order/${order._id}`} className="text-indigo-600 hover:text-indigo-900">Details</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderList;
