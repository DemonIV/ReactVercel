import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import { CartContext } from '../../../context/CartContext';

const CartCard = () => {
    const { cart } = useContext(CartContext);

    return (
        <Card className="menu-card">
            <Card.Body className="menu-card-body">
                <Card.Title>Cart</Card.Title>
                <Card.Text>
                    {cart.length > 0 ? (
                        <ListGroup>
                            {cart.slice(0,3).map(item => (
                                <ListGroup.Item key={item.id}>
                                    <div>
                                        <img 
                                            src={process.env.REACT_APP_API_DOMAIN+JSON.parse(item.product.imageURLs)[0]} 
                                            alt={item.product.name} 
                                            style={{ width: '50px', marginRight: '10px' }} 
                                        />
                                        <strong>{item.product.name}</strong> - {item.product.description}
                                    </div>
                                    <div>Color: {item.color}</div>
                                    <div>Size: {item.size}</div>
                                    <div>Quantity: {item.quantity}</div>
                                    <div>Price: ₺{(item.product.price*item.quantity).toFixed(2)}</div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        'Your cart is empty'
                    )}
                </Card.Text>
                <Link to="/cart" className="menu-link">
                    ...Cart <i className="fas fa-arrow-right"></i>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default CartCard;
