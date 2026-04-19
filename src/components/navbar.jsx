import { useNavigate, Link, useLocation } from 'react-router-dom';
import Cart from './cart';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem("token");
        navigate("/auth/login");
    }
    const location = useLocation();
    const currentPath = location.pathname;

    // Hide login/signup buttons if on login or register page
    const hideAuthButtons = currentPath === "/auth/login" || currentPath === "/auth/register";

    let usertype = null;

    if (token) {
        const decoded = jwtDecode(token);
        usertype = decoded.usertype;
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#4702a8" }}>
                {/* <h2 id="head" className='container' style={{ display: 'block' ,color: 'aliceblue',  fontFamily: "'Michroma', sans-serif", fontSize: 40}}>SHOP</h2> */}
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{ display: 'block', color: 'aliceblue', fontFamily: "'Michroma', sans-serif", fontSize: 40 }} to="/">
                        SHOP
                    </Link>
                </div>
                {/* <ul id="ul1">
                <li class = "li"><Link class = "li" to="/">Home</Link></li>
                <li class = "li"><Link class = "li" to="/auth/login">Login</Link></li>
                <li class = "li"><Link class = "li" to="/auth/register">Signup</Link></li>
                <li class = "li"><Link class = "li" to="/profile">Profile</Link></li>
                <li class = "li"><button onClick={handlelogout}>logout</button></li>
            </ul> */}


                {/* <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button> */}



                {!token && (
                    <div className="collapse navbar-collapse d-flex justify-content-end container-fluid" id="navbarNav">
                        {!hideAuthButtons && (
                            <div className="ms-auto d-flex gap-3">
                                <Link className="btn btn-outline-light" to="/auth/login">
                                    Login
                                </Link>
                                <Link className="btn btn-outline-light me-2" to="/auth/register">
                                    Signup
                                </Link>
                            </div>)}
                    </div>
                )}

                {token && (
                    <>
                        <ul id='ul1' className="d-flex align-items-center gap-3 px-4">
                            <li>
                                <button className="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas" >
                                    {/* <img src="/cart.svg" alt="Cart" width="22"/> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                    </svg>
                                </button>
                            </li>

                            <li><Link className="btn btn-outline-light" to="/profile">Profile</Link></li>
                            <li><button className="btn btn-outline-light" onClick={handlelogout}>Logout</button></li>
                        </ul>
                    </>
                )}
            </nav>
            {usertype === "buyer" && (
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartOffcanvas" style={{ "--bs-offcanvas-width": "600px" }}>
                    <div className="offcanvas-header">
                        <h5>Your Cart</h5>
                        <button className="btn-close" data-bs-dismiss="offcanvas" />

                    </div>

                    <div className="offcanvas-body d-flex flex-column">
                        <Cart />
                        <div className='text-center mt-auto'>
                            <Link className='btn btn-outline-success mt-auto px-5 py-3 rounded-5' to='/checkout/create-order'><h5>Checkout</h5></Link>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;