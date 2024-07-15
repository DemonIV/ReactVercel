import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCartItems, addToCart, removeFromCart, clearCart } from '../modules/cart/services/cartService'; // Servis fonksiyonlarını import edin

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [totalPrice,setTotalPrice]=useState(0);
    const { user } = useContext(AuthContext);
    const [errors,setErrors]=useState([]);

    useEffect(() => {
        if (user) {
            fetchCartFromDatabase();
        } else {
            fetchCartFromLocalStorage();
        }
        
    }, [user]);
    useEffect(()=>{

        setErrors([]);
    },[])
    const fetchCartFromDatabase = async () => {
        try {
            setErrors([]);
            const response = await getCartItems();
            if (response) {
                setCart(response.cartItems);
                console.log(response.cartItems);
                setTotalPrice(response.totalPrice);
            } else {
                console.error('Failed to fetch cart items');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setErrors([error.message]);
        }
    };

    const fetchCartFromLocalStorage = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    };
    const addProductToCart = async (item) => {
        setErrors([]);
        const { product, name, price, color, size, quantity,totalPrice:a } = item;
        const totalPrice = price * quantity;
       
        if (user) {
            const existingItemIndex = cart.findIndex(
                (cartItem) => cartItem.product === product && cartItem.color === color && cartItem.size === size
            );
    
            let updatedCart = [...cart];
            
            if (existingItemIndex !== -1) {
                updatedCart[existingItemIndex].quantity += quantity;
            } else {
                updatedCart.push({ product, name, price, color, size, quantity, totalPrice });
            }
    
            try {
                const response = await addToCart({ product, color, size, quantity });
                if (response) {
                    
                    const responseGetCart=await getCartItems()
                    setCart(responseGetCart.cartItems);
                    
                    
                } else {
                    console.error('Failed to add to cart');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
                setErrors([error.message]);
            }
        } else {
            const existingItemIndex = cart.findIndex(
                (cartItem) => cartItem.product.id === product && cartItem.color === color && cartItem.size === size
            );
    
            let updatedCart = [...cart];
            
            if (existingItemIndex !== -1) {
                updatedCart[existingItemIndex].quantity += quantity;
                updatedCart[existingItemIndex].totalPrice += totalPrice;
            } else {
                updatedCart.push({
                    product: { id: product, price: price, name: name,imageURLs:item.imageURLs },
                    name: name,
                    price: price,
                    color: color,
                    size: size,
                    quantity: quantity,
                    totalPrice: totalPrice
                });
            }
    
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };
    

    const removeProductFromCart = async (product) => {

        setErrors([]);
        if (user) {
            try {
                const response = await removeFromCart(product.id);
                if (response) {
                    const responseGetCart=await getCartItems()
                    console.log(responseGetCart);
                    setCart(responseGetCart.cartItems);
                    setTotalPrice(responseGetCart.totalPrice);
                } else {
                    console.error('Failed to remove from cart');
                }
            } catch (error) {
                console.error('Error removing from cart:', error);
                setErrors([error.message]);
            }
        } else {//Kullanıcı girişi yapılmadıysa localStorageta tut
           
            const updatedCart = cart.filter(item =>{return !(item.product.id === product.product.id)||
                ((item.product.id === product.product.id) && (!(item.color===product.color) || !(item.size===product.size)));});
            
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const clearCartItems = async () => {
        setErrors([]);
        if (user) {
            try {
                const response = await clearCart();
                if (response) {
                    setCart([]);
                } else {
                    console.error('Failed to clear cart');
                }
            } catch (error) {
                console.error('Error clearing cart:', error);
                setErrors([error.message]);
            }
        } else {
            setCart([]);
            localStorage.removeItem('cart');
        }
    };

    return (
        <CartContext.Provider value={{ cart, errors,addProductToCart, removeProductFromCart, clearCartItems }}>
            {children}
        </CartContext.Provider>
    );
}