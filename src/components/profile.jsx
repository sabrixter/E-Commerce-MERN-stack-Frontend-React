import { profile, addproduct, getproducts, getorders, getEarnings } from '../api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const Profile = () => {
  // const usertype = localStorage.getItem('usertype');
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await profile();
        setUser(res.data);
      } catch (error) {
        console.error('failed to fetch products', error)
      }
    };

    getProfile();
  }, []);

  const [product, setProduct] = useState({
    product_name: "",
    price: "",
    description: "",
    image: "",
  });

  const [products, setProducts] = useState([{
    product_name: "",
    price: "",
    description: "",
    image: "",
  }]);
  useEffect(() => {
    const getsellerproducts = async () => {
      try {
        const res = await getproducts();
        setProducts(res.data);
      } catch (error) {
        console.log('no products found', error)
      }
    };

    getsellerproducts();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log("New Product:", product);
    addproduct(product);
    navigate('/profile');

  };

  const [order, setOrder] = useState([]);
  useEffect(() => {
    const getallOrders = async () => {
      try {
        const ord = await getorders();
        setOrder(ord.data);
        console.log(ord.data);
      } catch (error) {
        console.log('no orders bruv', error)
      }
    }

    getallOrders;
  })

  useEffect(() => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(el => {
      new bootstrap.Popover(el);
    });
  }, [user]);
  const buildPopoverContent = (order) => {
    let content = `<div style="min-width:250px;">`;

    order.items.forEach(item => {
      content += `
      <div style="display:flex; align-items:center; margin-bottom:10px;">
        <img src="${item.product.image}" width='60' 
             style="width:25px;height:25px;object-fit:cover;margin-right:8px;border-radius:4px;" />
        <div>
          <div>${item.product.product_name}</div>
          <small>₹${item.product.price} × ${item.quantity}</small>
        </div>
      </div>
    `;
    });

    content += `
    <hr/>
    <div style="text-align:right;font-weight:bold;">
      Total: ₹${order.totalAmount}
    </div>
  </div>`;

    return content;
  };

  if (!user) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  const [earnings, setEarnings] = useState(0);
  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await getEarnings();
        setEarnings(res.data.totalEarnings);
      } catch (error) {
        console.error('Failed to fetch earnings', error);
      }
    };

    fetchEarnings();
  }, []);


  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Profile</h2>

      {/* BASIC USER INFO (BOTH) */}
      <div className="card mb-4">
        <div className="card-body">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Full Name:</strong> {user.fullname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
        </div>
      </div>

      {/* 🟦 BUYER VIEW */}
      {user.usertype === "buyer" && (
        <>
          <div className="accordion-item border rounded overflow-hidden p-4">
            <h2 className="accordion-header">
              <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#orders">
                <strong className='py-3 h3'>My Orders</strong>
                <i className="bi bi-chevron-down"></i>
              </button>
            </h2>

            <div id="orders" className="accordion-collapse collapse show border rounded overflow-hidden p-4">
              <div className="accordion-body">
                {user?.orders?.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {user.orders.map(item => (
                      <li key={item._id} className="list-group-item">
                        {/* Order ID: {item.order._id} */}
                        <button
                                type="button"
                                className="btn btn-md btn-dark float-end"
                                data-bs-toggle="popover"
                                data-bs-placement="right"
                                data-bs-html="true"
                                data-bs-trigger="focus"
                                data-bs-content={buildPopoverContent(item.order)}
                              >
                                View Details
                              </button><ul className="list-group">
                          {/* {item.order.items.map(prod => (
                            <li key={prod._id}>
                              
                            </li>
                          ))} */}
                        </ul>
                        <div>
                          <p>Total Amount : {item.order.totalAmount}</p>
                          <p>Ordered placed on: {Date(item.order.createdAt).toLocaleString()}</p>
                          <p>Status: {item.order.status}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No orders yet</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 🟪 SELLER VIEW */}
      {user.usertype === "seller" && (
        <>
          <div className="accordion-item border rounded overflow-hidden p-4">
            <h1 className="accordion-header">
              <button className="accordion-button d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#earnings" aria-expanded="true" aria-controls="collapseOne">
                <span><strong>Earnings</strong></span>
                
                <i className="bi bi-chevron-down"></i>
              </button>
            </h1>

            <div id="earnings" className="accordion-collapse collapse show">
              <div className="accordion-body py-3">
                <h3 className="text-success">₹{earnings.toFixed(2)}</h3>
              </div>
            </div>
          </div>

          <div className="accordion-item border rounded overflow-hidden p-4">

            <h2 className="accordion-header">
              <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#Product">
                <strong>Your Products</strong>
                <i className="bi bi-chevron-down"></i>
              </button>
            </h2>

            <div id="Product" className="accordion-collapse collapse show py-4">
              <div className="accordion-body">
                {products.map(product => (
                  <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                    <div className="card h-100 shadow-sm">

                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.product_name}
                        style={{
                          height: "100px",
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
          </div>

          <div className="accordion-item border rounded overflow-hidden p-4">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#addProduct">
                <strong>Add Product</strong>
                <i className="bi bi-chevron-down"></i>
              </button>
            </h2>

            <div id="addProduct" className="accordion-collapse collapse py-3">
              <div className="accordion-body text-light">
                <form onSubmit={handleAddProduct}>
                  <input
                    className="form-control mb-2"
                    placeholder="Product name"
                    name="product_name"
                    value={product.product_name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    className="form-control mb-2"
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />

                  <textarea
                    className="form-control mb-2"
                    placeholder="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                  />

                  <input
                    className="form-control mb-3"
                    placeholder="Image URL"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    required
                  />

                  {product.image && (
                    <img
                      src={product.image}
                      alt="Preview"
                      className="img-fluid mb-3 rounded"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  )}

                  <button className="btn btn-primary">
                    Add Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>

      )}
    </div >
  );
}

export default Profile;
