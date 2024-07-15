import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './modules/core/components/Navbar';
import Footer from './modules/core/components/Footer'
import Home from './modules/home/components/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// Auth modules
import SignIn from './modules/auth/components/SignIn';
import SignUp from './modules/auth/components/SignUp';

// Cart module
import Cart from './modules/cart/components/Cart';

// Products modules
import Products from './modules/products/components/Products';
import ProductDetail from './modules/products/components/ProductDetail';

// User module
import Dashboard from './modules/user/components/Dashboard';
import NotFound from './pages/NotFound';
import Payment from './modules/payment/components/Payment';
import { PaymentProvider } from './context/PaymentContext';
import SignOut from './modules/auth/components/SignOut';
import Profile from './modules/profile/components/Profile';
import ProtectedRoute from './modules/core/components/ProtectedRoute';
import { AuthContext } from './context/AuthContext';
import Category from './modules/category/components/Category';
import Checkout from './modules/checkout/components/Checkout'


function App() {
    const {user}=useContext(AuthContext);
    return (        
    <div className="app-container">
        <Navbar />
        <div className="content-wrapper">
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

                {/* Auth routes */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signout" element={<SignOut />} /> {/* Giriş yapmayan kullanıcıyı giriş sayfasına yönlendirecek */}
       

                {/* Payment route */}
                <Route path="/payment" element={<Payment />} />
    
                {/* Cart route */}
                <Route path="/cart" element={<Cart />} />

                {/* Products routes */}
                <Route path="/products" exact element={<Products />} />
                <Route path="/products/:productId" element={<ProductDetail />} />
                <Route path="/categories/:category" element={<Category />} />

             -
                {/* User route */}
                <Route path="/profile" element={<Profile />}/>
                
                <Route path="/checkout" element={<Checkout />}/>
                

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
        <Footer />
    </div>
    );
}

export default App;
