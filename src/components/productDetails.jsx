import { product_details, addtocart } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Details = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        product_details(id)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id]);

    if (!product) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    const handleAddToCart = async (productId) => {
        try {
            const response = await addtocart(productId);
            console.log('Product added:', response);
            // Optionally update local cart state
            // setCart(response.cart)
        } catch (error) {
            console.error('Failed to add product to cart', error);
        }
    };

    const token = localStorage.getItem('token');
    let usertype = null;

    if (token) {
        const decoded = jwtDecode(token);
        usertype = decoded.usertype;
    }

    return (
        <div className="row mx-0 my-5 align-items-start">
            {/* Left: Product Image */}
            <div className="col-md-6 d-flex justify-content-center align-items-start px-5">
                <img
                    src={product.image}
                    alt={product.product_name}
                    className="img-fluid rounded shadow-lg"
                    style={{ maxHeight: "550px", objectFit: "contain" }}
                />
            </div>

            {/* Right: Product Details */}
            <div className="col-md-6 px-5 align-items-center">
                <div className="bg-white p-5 shadow-lg rounded">
                    <h2 className="mb-4" style={{ letterSpacing: "0.5px" }}>{product.product_name}</h2>
                    <h4 className="text-success mb-4" style={{ letterSpacing: "0.5px" }}>${product.price}</h4>
                    <p className="mb-4" style={{ lineHeight: 1.8, letterSpacing: "0.5px" }}>
                        {product.description}
                    </p>
                    {usertype === "buyer" && (<button
                        className="btn btn-primary btn-lg"
                        onClick={() => handleAddToCart(product._id)}
                    >
                        Add to Cart
                    </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Details;