import { useState, useEffect } from "react";
import { getcart, verifyorder, neworder } from "../api";

const CreateOrder = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    const GST_RATE = 0.18;

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await getcart();
                setCart(res.data);
                console.log(res.data);
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        }

        fetchCart();
    }, []);

    if (!cart) return <h2>Loading...</h2>;

    const subtotal = (cart?.items || []).reduce(
        (acc, item) => acc + item.priceAtPurchase * item.quantity,
        0
    );

    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;

    const handlePayment = async () => {
        try {
            setLoading(true);

            // 1️⃣ Create Razorpay order
            const { data } = await neworder();

            const options = {
                key: 'rzp_test_Sb4BS00JFodyBs',
                amount: data.amount,
                currency: "INR",
                name: "Your Store",
                description: "Order Payment",
                order_id: data.razorpayOrderId,

                handler: async function (response) {
                    try {
                        const res = await verifyorder({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                        });
                        console.log('hereeee', res);
                        if (res.data.success) {
                            alert("Payment Successful 🎉");
                        } else {
                            alert("Payment verification failed ❌");
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        alert("Payment verification error ❌");
                    }
                },

                theme: {
                    color: "#000",
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (err) {
            console.error(err);
            alert("Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
            <h1>Checkout</h1>

            {/* Cart Items */}
            <div>
                {cart.items.map(item => (
                    <div
                        key={item._id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #ddd",
                            padding: "10px 0",
                        }}
                    >
                        <div>
                            <h4>{item.product.product_name}</h4>
                            <p>Qty: {item.quantity}</p>
                        </div>
                        <div>₹{item.priceAtPurchase * item.quantity}</div>
                    </div>
                ))}
            </div>

            {/* Price Breakdown */}
            <div style={{ marginTop: "20px" }}>
                <h3>Price Details</h3>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>GST (18%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                </div>

                <hr />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>Total</strong>
                    <strong>₹{total.toFixed(2)}</strong>
                </div>
            </div>

            {/* Pay Button */}
            <button
                onClick={handlePayment}
                disabled={loading}
                style={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "12px",
                    background: "black",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
};

export default CreateOrder;