import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { useProducts } from '../../../context/ProductsContext';
import { Carousel, ProgressBar, Spinner } from 'react-bootstrap';
import ImageGallery from "react-image-gallery";
import { getProductById } from '../services/productService';
import api from '../../../api';
import SizeChartTable from './SizeChartTable';
import MeasurementCard from './MeasurementCard';
import '../styles/ProductDetail.css';  // Stil dosyasını ekliyoruz

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const { addProductToCart, errors } = useContext(CartContext);

    useEffect(() => {
        (async () => {
            const foundProduct = await getProductById(productId);

            if (foundProduct) {
                setProduct(foundProduct);
                setSelectedColor(foundProduct.stocks[0].color);
                setSelectedSize(foundProduct.stocks[0].size);
            } else {
                console.log(`Product with ID ₺{productId} not found.`);
            }
        })();
    }, []);

    useEffect(() => {
        if (selectedColor) {
            const selectedStock = product.stocks.filter(stock => stock.color === selectedColor);

            if (selectedStock[0]) {
                setSelectedSize(selectedStock[0].size);
            }
        }
    }, [selectedColor, product]);

    const handleAddToCart = () => {
        const item = {
            product: product.id,
            name: product.name,
            price: product.price,
            color: selectedColor,
            size: selectedSize,
            quantity: selectedQuantity,
            totalPrice: product.price * selectedQuantity
        };
        console.warn("sdsdf", item);
        addProductToCart(item);
    };

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setSelectedQuantity(parseInt(e.target.value));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {errors && errors.length > 0 &&
                    errors.map(error => (
                        <span key={{ error }} style={{ color: "red" }}>{error}</span>))
                }
            </div>
            <div className="row">
                <div className="col-md-6">
                    {!product &&(
                            <Spinner animation="border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>
                    )}
                    {product && (
                        <>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Fiyat: ₺{Number(product.price).toFixed(2)}</p>
                            <div className="form-group">
                                <label htmlFor="color">Renk Seçimi:</label>
                                <select className="form-control" id="color" value={selectedColor} onChange={handleColorChange}>
                                    {[...new Set(product.stocks.map(stock => stock.color))].map(color => (<option key={color}>{color}</option>))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="size">Beden Seçimi:</label>
                                <select className="form-control" id="size" value={selectedSize} onChange={handleSizeChange}>
                                    {product.stocks
                                        .filter(stock => stock.color === selectedColor)
                                        .map(selectedColorStock => (
                                            <option key={selectedColorStock.size}>{selectedColorStock.size}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Miktar:</label>
                                <input type="number" className="form-control" id="quantity" min="1" value={selectedQuantity} onChange={handleQuantityChange} />
                            </div>
                            <button className="btn btn-primary" onClick={handleAddToCart}>Sepete Ekle</button>
                        </>
                    )}
                </div>
                <div className="col-md-6">
                    {product && JSON.parse(product.imageURLs).length > 0 && (
                        <Carousel>
                            {JSON.parse(product.imageURLs).map((imageUrl, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={process.env.REACT_APP_API_DOMAIN + imageUrl}
                                        alt={`Slide ₺{index}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <MeasurementCard />
                </div>
                <div className="col-md-6">
                    <SizeChartTable />
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
