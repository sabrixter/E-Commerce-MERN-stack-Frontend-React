import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Allproducts from './components/home.jsx';
import Navbar from './components/navbar.jsx'
import Auth from './components/auth.jsx'
// import Home from './components/home.jsx'
import Profile from './components/profile.jsx'
import ProductDetails from './components/productDetails.jsx'
import CreateOrder from "./components/checkout.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Allproducts />} />
          {/* <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} /> */}
          <Route path="/auth/:type" element={<Auth />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path ="/product/:id" element={<ProductDetails/>} />
          <Route path="/checkout/create-order" element={<CreateOrder/>} />
      </Routes>
    </Router>
  );
}

export default App;