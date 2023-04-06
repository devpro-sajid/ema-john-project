import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { addToDb, removeFromDb } from '../../utilities/faked';
const Orders = () => {
    const SavedCart=useLoaderData();
    const [cart,setCart]=useState(SavedCart);
    const handleRemoveFromCart=(id)=>{
       const remaining=cart.filter(pd=>pd.id!=id);
       setCart(remaining);
       removeFromDb(id);
    }
    return (
        <div className='shop-container'>
            <div className="review-container">
            {
                cart.map(pd=><ReviewItem handleRemoveFromCart={handleRemoveFromCart} product={pd} key={pd.id}></ReviewItem>)
            }
            </div>
            <div>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;