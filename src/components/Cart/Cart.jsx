import React from 'react';
import "./Cart.css";
const Cart = ({cart}) => {
    let total=0;
    let totalShipping=0;
    let quantity=0;
 for(const product of cart){
    product.quantity=product.quantity||1;
total=total + product.price* product.quantity;
totalShipping=totalShipping +product.shipping;
quantity=quantity+product.quantity;
 }  
 const tax=total/100*7;
 const grandTotal=total+totalShipping+tax;
    return (
        <div className='cart'>
        <h4>Order Summary</h4>
        <p>Selected Items: {quantity}</p>
        <p>Total Price: ${total.toFixed(2)}</p>  
        <p>Total Shipping: ${totalShipping.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
        </div>
    );
};

export default Cart;