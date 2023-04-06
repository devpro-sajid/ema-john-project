import { getShoppingCart } from "./faked";

const cartProductsLoader=async ()=>{
    const loadedProducts=await fetch('products.json');
    const products=await loadedProducts.json();
    const storedCart=getShoppingCart();
    const savedProducts=[];
    for(const id in storedCart){
        const addedProduct=products.find(pd=>pd.id==id);
        if(addedProduct){
            const quantity=storedCart[id];
            addedProduct.quantity=quantity;
            savedProducts.push(addedProduct);
        }
    }
    return savedProducts;
}
export default cartProductsLoader;