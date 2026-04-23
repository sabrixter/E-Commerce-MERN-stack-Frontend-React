import axios from 'axios';

const API = axios.create({baseURL: 'https://e-commerce-mern-stack-ma46.onrender.com/api'});
// const API = axios.create({baseURL: 'http://localhost:5000/api'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('token')){
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
})

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

export const productlist = () => API.get('/product');

export const product_details = (id) => API.get(`/product/${id}`);

export const addproduct = (formData) => API.post('/product/add_prod', formData);
export const profile = () => API.get('/profile');
export const getorders = () => API.get('/profile/orders');
export const getproducts = () => API.get('/profile/products');
export const getEarnings = () => API.get('/profile/earnings');

export const getcart = () => API.get('/cart');
export const addtocart = (prod_id) => API.post(`/cart/add/${prod_id}`);
export const patchcart = (prod_id) => API.patch(`/cart/decrease/${prod_id}`);
export const deleteitem =  (prod_id) => API.delete(`/cart/remove/${prod_id}`);

export const neworder = () => API.post('/checkout/create-order');
export const verifyorder = (data) => API.post('/checkout/verify-payment', data);
