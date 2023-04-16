import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { addToDb, deleteShoppingCart, removeFromDb } from '../../utilities/faked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
const Orders = () => {
    const SavedCart=useLoaderData();
    const [cart,setCart]=useState(SavedCart);
    const handleRemoveFromCart=(id)=>{
       const remaining=cart.filter(pd=>pd.id!=id);
       setCart(remaining);
       removeFromDb(id);
    }
const handleClearCart=()=>{
    setCart([]);
    deleteShoppingCart();
}

    return (
        <div className='shop-container'>
            <div className="review-container">
            {
                cart.map(pd=><ReviewItem handleRemoveFromCart={handleRemoveFromCart} product={pd} key={pd.id}></ReviewItem>)
            }
            </div>
            <div>
                <Cart handleClearCart={handleClearCart} cart={cart}><Link className='proceed-link' to='/checkout'><button className='btn-proceed'>proceed Checkout <FontAwesomeIcon icon={faCreditCard}/> </button></Link></Cart>
            </div>
        </div>
    );
};

export default Orders;