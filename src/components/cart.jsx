import { getcart, patchcart, deleteitem, addtocart } from '../api'; // adjust path as needed
import { useState, useEffect } from 'react';

const Cart = () => {
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });

    // Fetch cart on component mount
    const fetchCart = async () => {
        try {
            const res = await getcart(); // assuming you have a GET /cart route
            setCart(res.data);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {

        fetchCart();
    }, []);

    // Decrease quantity
    const handleDecrease = async (prod_id) => {
        try {
            const updatedCart = await patchcart(prod_id);
            setCart(updatedCart.data); // update state
            fetchCart(); // refetch cart to get updated data
        } catch (err) {
            console.error(err);
        }
    };

    // Delete item
    const handleDelete = async (prod_id) => {
        try {
            const updatedCart = await deleteitem(prod_id);
            setCart(updatedCart.data); 
            fetchCart();// update state
        } catch (err) {
            console.error(err);
        }
    };

    //adding a new product
    const handleIncrease = async (prod_id) => {
        try {
            const updatedCart = await addtocart(prod_id);
            setCart(updatedCart.data);
            fetchCart();
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
                        // <div key={item.product._id} className="d-flex gap-3 mb-3">

                        //     <img
                        //         src={item.product.image}
                        //         alt={item.product.product_name}
                        //         width="60"
                        //     />

                        //     <div>
                        //         <h6>{item.product.product_name}</h6>
                        //         <p>₹{item.product.price}</p>
                        //         <p>Qty: {item.quantity}</p>
                        //     </div>

                        // </div>
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