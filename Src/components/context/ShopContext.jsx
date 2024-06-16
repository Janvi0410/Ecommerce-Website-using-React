import React, { createContext, useState } from "react";
import all_products from '../components/Assets/all_product';
 // Adjust this path if necessary

// Create a context with null as the default value
export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let Cart = {};
    for (let index = 0; index < all_products.length; index++) {
        Cart[all_products[index].id] = 0;
    }
    return Cart;
}

const ShopContextProvider = (props) => {
    // Define the context value
    const [CartItems, setCartItems] = useState(getDefaultCart());

    const addtocart = (ItemId) => {
        setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
    }

    const removefromcart = (ItemId) => {
        setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in CartItems) {
            if (CartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    const price = parseFloat(itemInfo.new_price);
                    if (!isNaN(price)) {
                        totalAmount += price * CartItems[item];
                    } else {
                        console.error(`Invalid price for item ${itemInfo.name}: ${itemInfo.new_price}`);
                    }
                } else {
                    console.error(`No product found with id ${item}`);
                }
            }
        }
        console.log(`Total amount calculated: ${totalAmount}`);
        return totalAmount; // Ensure this is outside the loop
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in CartItems) {
            if (CartItems[item] > 0) {
                totalItem += CartItems[item];
            }
        }
        return totalItem; // Ensure this is outside the loop
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_products, CartItems, addtocart, removefromcart };

    // Provide the context value to children components
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
