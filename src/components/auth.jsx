// import { useState } from "react";
import { login, register } from "../api";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Auth = () => {
    const { type } = useParams(); // 'login' or 'register'
    const [activeTab, setActiveTab] = useState("login"); // default



    useEffect(() => {
        if (type === "login" || type === "register") {
            setActiveTab(type);
        }
    }, [type]);




    // Form state
    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        phnumber: "",
        password: "",
    });
    
    const [usertype, setUsertype] = useState("buyer");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleRadioChange = (e) => {
        setUsertype(e.target.value);
    };


    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const dataToSend = { ...formData, usertype };
        console.log(dataToSend);
        if (activeTab === "login") {
            const response = await login(dataToSend); //api call for login
            console.log("Logging in:", dataToSend);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            if (usertype === "seller"){
                navigate('/profile')
            }
            else{

                navigate('/');
            }
        } else {
            const response = await register(dataToSend); //api call at register
            console.log("Registering:", dataToSend);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            if (usertype === "seller") {
                navigate('/profile')
            }
            else {

                navigate('/');
            }            
        }
    };


    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            {/* Tabs */}
            <div className="d-flex justify-content-center mb-4">
                <button
                    className={`btn me-2 ${activeTab === "login" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setActiveTab("login")}
                >
                    Login
                </button>
                <button
                    className={`btn ${activeTab === "register" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setActiveTab("register")}
                >
                    Register
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {activeTab === "register" && (
                    <>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="number"
                                className="form-control"
                                name="phnumber"
                                value={formData.phnumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                )}

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Buyer/Seller */}
                <div className="mb-3">
                    <label className="form-label me-3">I am a:</label>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="usertype"
                            value="buyer"
                            checked={usertype === "buyer"}
                            onChange={handleRadioChange}
                        />
                        <label className="form-check-label">Buyer</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="usertype"
                            value="seller"
                            checked={usertype === "seller"}
                            onChange={handleRadioChange}
                        />
                        <label className="form-check-label">Seller</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    {activeTab === "login" ? "Login" : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Auth;
