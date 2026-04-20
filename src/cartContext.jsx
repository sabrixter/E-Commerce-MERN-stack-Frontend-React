import { createContext, useContext, useState, useEffect } from "react";
import { getcart, addtocart, patchcart, deleteitem } from "./api";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });

    const fetchCart = async () => {
        const res = await getcart();
        setCart(res.data);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addItem = async (prod_id) => {
        const res = await addtocart(prod_id);
        setCart(res.data);
        fetchCart();
    };

    const decreaseItem = async (prod_id) => {
        const res = await patchcart(prod_id);
        setCart(res.data);
        fetchCart();
    };

    const deleteItem = async (prod_id) => {
        const res = await deleteitem(prod_id);
        setCart(res.data);
        fetchCart();
    };

    return (
        <CartContext.Provider value={{ cart, addItem, decreaseItem, deleteItem }}>
            {children}
        </CartContext.Provider>
    );
};