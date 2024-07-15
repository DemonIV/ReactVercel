import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import {
  BrowserRouter
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';


import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'jquery/dist/jquery';
import "react-image-gallery/styles/css/image-gallery.css";

import 'popper.js/dist/umd/popper'
import { CartProvider } from './context/CartContext';
import { PaymentProvider } from './context/PaymentContext';
import {ProductsProvider} from './context/ProductsContext'
import { UserProvider } from './context/UserContext';
import { CheckoutProvider } from './context/CheckoutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          <ProductsProvider>
            
            <UserProvider> 
              <App />     
            </UserProvider>
          </ProductsProvider>
          </CheckoutProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
