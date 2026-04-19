import { productlist } from "../api";
// import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// import "@material/web/card/filled-card.js";
import "@material/web/button/filled-button.js";
import "@material/web/progress/circular-progress.js";

//typography
import '@material/web/typography/md-typescale-styles.js';
import "bootstrap/dist/css/bootstrap.min.css";


const Allproducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await productlist();
                setProducts(data);
                // console.log(data);
            } catch (error) {
                console.error('failed to fetch products', error)
            } 
            // finally {
            //     setloading(false);
            // }
        };

        getProducts();
    }, []);







    // if loadin    g is shown
    // if (loading) {
    //     return (
    //         <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
    //             <md-circular-progress indeterminate></md-circular-progress>
    //         </div>
    //     );
    // }





    //if no products were found or fetched
    if (!products || products.length === 0) {
        return (
            <p className="body-large-emphasized" style={{ color: '#333', fontFamily: "'Michroma', sans-serif", color: '#6200ee' }}>
                No products found. :(
            </p>
        );
    }







    //when something is fetched and the products object in state has length more than 1
    return (
        <div className="container-fluid py-4 ">
            <h1 className="mb-4 text-primary">
                Products
            </h1>

            {/* Grid layout */}
            <div
                className="row g-4"
            >
                {products.map((product) => (
                    <div className="col-sm-6 col-md-4 col-lg-2" key={product._id}>
                        <div className="card h-100 shadow-sm">

                            {/* Product Image */}
                            <img
                                src={product.image}
                                className="card-img-top"
                                alt={product.product_name}
                                style={{
                                    height: "200px",
                                    objectFit: "cover",
                                }}
                            />

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    {product.product_name}
                                </h5>

                                <p className="fw-bold mb-3">
                                    ${product.price}
                                </p>

                                <Link
                                    to={`/product/${product._id}`}
                                    className="btn btn-primary mt-auto"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Allproducts;
