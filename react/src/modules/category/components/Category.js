import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import * as productService from '../../products/services/productService'; // Kategori servisi
import ProductCard from '../../products/components/ProductCard'; // ProductCard bileşeni

const Category = ({ match }) => {
    const [products, setProducts] = useState([]);
    const {category}=useParams();
    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
   
                const products = await productService.getProductsByCategorySlug(category);
                
                setProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductsByCategory();
    }, [category]);

    return (
        <div className="container mt-5">
            <h2>{category} Products</h2>
            <div className="row">
                {products.map((product, index) => (
                     <div className="col-md-4 mb-4" key={product._id}>
                    <ProductCard key={index} product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
