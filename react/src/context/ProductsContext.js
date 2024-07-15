import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllFeaturedProducts, getAllProducts } from '../modules/products/services/productService';
import { getAllCategories } from '../modules/category/services/categoryService';

// Örnek mock ürün verisi
const initialProducts = [
   {}
];

// Context oluşturulması
export const ProductsContext = createContext();

// Context sağlayıcısı bileşeni
export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState(null);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        // localStorage'da son isteğin zaman bilgisini kontrol et
        const lastRequestTime = localStorage.getItem('lastRequestTimeForProductsContext');
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastRequestTime;
        // Eğer son istek 4 dakikadan önce yapılmışsa tekrar istek gönderme
        if (!lastRequestTime || timeDiff > 240000) {
             //API requests
            (async () => {

                const productsData = await getAllProducts();
                const featuredProductsData = await getAllFeaturedProducts();
                const categoriesData = await getAllCategories();
                if(productsData&&featuredProductsData&& categoriesData){
                // State güncelleme
                setProducts(productsData);
                setFeaturedProducts(featuredProductsData);
                setCategories(categoriesData);
                // localStorage'da son isteğin zamanını güncelle
                localStorage.setItem('lastRequestTimeForProductsContext', currentTime);

                // localStorage'a cached verileri kaydet
                localStorage.setItem('cachedProducts', JSON.stringify(productsData));
                localStorage.setItem('cachedFeaturedProducts', JSON.stringify(featuredProductsData));
                localStorage.setItem('cachedCategories', JSON.stringify(categoriesData));
            
            }
            })();
        } else {
            // localStorage'da saklanan verileri kullan
            const cachedProducts = JSON.parse(localStorage.getItem('cachedProducts'));
            const cachedFeaturedProducts = JSON.parse(localStorage.getItem('cachedFeaturedProducts'));
            const cachedCategories = JSON.parse(localStorage.getItem('cachedCategories'));

            setProducts(cachedProducts);
            setFeaturedProducts(cachedFeaturedProducts);
            setCategories(cachedCategories);
        }
        
    }, []);

    const getProductById=(id)=>{
        return products.find(prod=>prod.id===id)
    }

    return (
        <ProductsContext.Provider value={{ categories, products,getProductById, featuredProducts, setFeaturedProducts, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};


export const useProducts=()=>useContext(ProductsContext);