import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../checkoutSteps/checkoutSteps";
import { savePaymentMethod } from "../../slices/cartSlice";


export default function Payment() {
    const [selectedPayment, setSelectedPayment] = useState("PayPal");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);

    const { shippingAddress } = cart;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(selectedPayment));
        navigate("/placeorder");
    }

    useEffect(() => {
        if(!shippingAddress.address){
            navigate("/checkout");
        }

    },[shippingAddress, navigate]);

    

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <CheckoutSteps />
            <h1 className="block text-gray-700 text-xl font-bold my-2">Payment Method</h1>
            <form onSubmit={handleSubmit}>
                {/* <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card">
                        <input
                            type="radio"
                            id="card"
                            name="payment"
                            value="card"
                            className="mr-2 leading-tight"
                            checked={selectedPayment === "card"}
                            onChange={() => setSelectedPayment("card")}
                        />
                        Card
                    </label>
                </div> */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paypal">
                        <input
                            type="radio"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            className="mr-2 leading-tight"
                            checked
                            onChange={(e) => setSelectedPayment(e.target.value  )}
                        />
                        PayPal or Credit Card
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
}