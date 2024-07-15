import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ProductsContext } from '../../../context/ProductsContext';
import { getAllProducts } from '../services/productService';

function Products() {

    const {products,setProducts}=useContext(ProductsContext);

    useEffect(() => {
        (async ()=>{
           const productsData=await getAllProducts();
           setProducts(productsData);
           
        })();
    }, [setProducts]);
    return (
        <div className="container mt-5">
            <div className="row">
                {products?.map(product => (
                     <div className="col-md-4 mb-4" key={product.id}>
                     <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
