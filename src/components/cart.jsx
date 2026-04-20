import { getcart, patchcart, deleteitem, addtocart } from '../api'; // adjust path as needed
import { useState, useEffect } from 'react';
import { useCart } from '../cartContext'; // if you want to use context instead of local state

const Cart = () => {
    const { cart, addItem, decreaseItem, deleteItem } = useCart(); // using context for cart state and actions

    // Decrease quantity
    const handleDecrease = async (prod_id) => {
        try {
            decreaseItem(prod_id);
        } catch (err) {
            console.error(err);
        }
    };

    // Delete item
    const handleDelete = async (prod_id) => {
        try {
            deleteItem(prod_id);
        } catch (err) {
            console.error(err);
        }
    };

    //adding a new product
    const handleIncrease = async (prod_id) => {
        try {
            addItem(prod_id);
        } catch (err) {
            console.error(err);
        }
    };


    // Styles for nav-link-like buttons
    const buttonStyle = `
    btn btn-outline-primary btn-sm rounded-pill mx-1
    text-dark bg-opacity-10 border-opacity-25
  `;

    return (
        <>
            {cart.items.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <ul className="list-group">
                    {cart.items.map(item => (
                        <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                            {/* <span>
                                Product {item.product}<br/>
                                Qty: {item.quantity} <br/>
                                Price: ${item.priceAtPurchase}
                            </span> */}
                            <img
                                src={item.product.image}
                                alt={item.product.product_name}
                                width="60"
                            />

                            <div>
                                <h6>{item.product.product_name}</h6>
                                <p>₹{item.product.price}</p>
                                <p>Qty: {item.quantity}</p>
                            </div>
                            <div>
                                <button className={buttonStyle} onClick={() => handleDecrease(item.product._id)}>-</button>
                                <button className={buttonStyle} onClick={() => handleIncrease(item.product._id)}>+</button>
                                <button className={buttonStyle} onClick={() => handleDelete(item.product._id)}>Delete</button>
                            </div>
                        </li>                        
                    ))}
                </ul>
            )}
            <div className="mt-3">
                <strong>Total: ${cart.totalPrice}</strong>
            </div>
        </>

    );
};

export default Cart;