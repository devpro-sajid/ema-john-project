import { faAddressCard, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { deleteShoppingCart, getShoppingCart } from '../../utilities/faked';
import { addToDb } from '../../utilities/faked';

import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
useEffect(()=>{
 const storedCart=getShoppingCart();
 const savedCart=[] ;
 for(const id in storedCart){
const addedProduct=products.find(product=>product.id===id);
if(addedProduct){
    const quantity=storedCart[id];
    addedProduct.quantity=quantity; 
    savedCart.push(addedProduct);   
}
 setCart(savedCart)
}
},[products])
    const handleAddToCart = (product) => {
        // cart.push(product); 
      let newCart=[];
      const exists=cart.find(pd=>pd.id===product.id);
      if(!exists){
        product.quantity=1;
newCart=[...cart,product];
      }
      else{
        exists.quantity=exists.quantity+1;
        const remaining=cart.filter(pd=>pd.id !== product.id);
        newCart=[...remaining,exists];
    }
        setCart(newCart);
        addToDb(product.id);
    }
    const handleClearCart=()=>{
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                {/* <h4>Order Summary</h4>
                <p>Selected Items: {cart.length}</p> */}
                <Cart handleClearCart={handleClearCart} cart={cart}><Link className='proceed-link' to='/order'><button className='btn-proceed'>Orders Review <FontAwesomeIcon icon={faArrowRight} /></button></Link></Cart>
            </div>
        </div>
    );
};

export default Shop;