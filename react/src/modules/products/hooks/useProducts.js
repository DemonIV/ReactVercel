import { useState, useEffect } from 'react';

export function useProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Ürünleri fetch et
        setProducts([
            { id: 1, name: 'Ürün 1', price: 100 },
            { id: 2, name: 'Ürün 2', price: 200 },
            { id: 3, name: 'Ürün 3', price: 300 }
        ]);
    }, []);

    return products;
}
