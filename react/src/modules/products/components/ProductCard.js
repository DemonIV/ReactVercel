import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';

function ProductCard({ product }) {
    return (
        <div className="card mb-4">
            <img src={process.env.REACT_APP_API_DOMAIN+JSON.parse(product.imageURLs)[0]} className="card-img-top" alt={product.name} />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Fiyat: ₺{Number(product.price).toFixed(2)}</p>
                <Link to={`/products/${product.id}`} className="btn btn-primary">Detayları Gör</Link>
            </div>
        </div>
    );
}

export default ProductCard;
