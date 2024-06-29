const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state)=>{
    
            //Calculate items price
            state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            //Calculate Shipping Price
            state.shippingPrice = state.itemsPrice > 500 ? addDecimal(0) : addDecimal(45);
            //Calculate Tax Price 18% GST
            state.taxPrice = addDecimal(Number((0.18 * state.itemsPrice).toFixed(2)));
            //Calculate Total Price
            state.totalPrice = addDecimal(Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice));

            localStorage.setItem("cart", JSON.stringify(state));
            
            return state;
}