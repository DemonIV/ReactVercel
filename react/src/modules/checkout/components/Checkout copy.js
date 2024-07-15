import React, { useState,useContext } from 'react';
import { Container, Row, Col, Form, Button, ProgressBar, Table, Alert, Card } from 'react-bootstrap';
import { CartContext } from '../../../context/CartContext';


import CartTable from './CartTable';


const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1); // Start with Cart Review step
  const {cart:cartItems}=useContext(CartContext);

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: ''
  });

  const [shippingMethod, setShippingMethod] = useState('standardShipping');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.pricePerItem * item.quantity, 0);
  const shippingCost = shippingMethod === 'standardShipping' ? 5.99 : 15.99;
  const totalAmount = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }
    // Handle order placement logic
    setCurrentStep(4); // Move to Confirmation step
  };

  return (
    <Container>
      <header className="d-flex justify-content-between align-items-center py-3">
        <img src="url_to_logo_image" alt="Logo" />
        <nav>
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/cart">Cart</a>
          <a href="/profile">Profile</a>
        </nav>
        <div>
          <i className="fas fa-shopping-cart"></i> {cartItems.length}
        </div>
      </header>

      <ProgressBar now={(currentStep / 5) * 100} className="my-4" label={`Step ${currentStep} of 5`}/>

      {currentStep === 1 && (
        <div>
          <h2>Cart Review</h2>
            <CartTable cartItems={cartItems}/>
          <Button variant="primary" onClick={() => setCurrentStep(2)}>Proceed to Shipping</Button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2>Shipping Information</h2>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={shippingInfo.name} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" name="phoneNumber" value={shippingInfo.phoneNumber} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="addressLine1">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control type="text" name="addressLine1" value={shippingInfo.addressLine1} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="addressLine2">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control type="text" name="addressLine2" value={shippingInfo.addressLine2} onChange={handleInputChange} />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" value={shippingInfo.city} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="state">
                  <Form.Label>State/Province/Region</Form.Label>
                  <Form.Control type="text" name="state" value={shippingInfo.state} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select" name="country" value={shippingInfo.country} onChange={handleInputChange} required>
                    <option value="">Select Country</option>
                    <option value="tr" active>Turkey</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <h3>Shipping Method</h3>
            <Form.Check
              type="radio"
              label="Standard Kargo - ₺70"
              name="shippingMethod"
              value="standardShipping"
              checked={shippingMethod === 'standardShipping'}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
           
            <Button variant="primary" onClick={() => setCurrentStep(3)}>Proceed to Payment</Button>
          </Form>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <h2>Payment Information</h2>
          <Card>
            <Card.Body>
              <iframe
                src="url_to_payment_gateway_iframe"
                width="100%"
                height="500px"
                title="Payment"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Card.Body>
          </Card>
          <Button variant="primary" onClick={() => setCurrentStep(5)}>Review Order</Button>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h2>Review Order Burada başka ayrıntıları da yazarız </h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>₺{Number(item.product.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Shipping: ${shippingCost.toFixed(2)}</p>
            <p>Total: ${totalAmount.toFixed(2)}</p>
          </div>
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <Button variant="primary" onClick={handlePlaceOrder}>Place Order</Button>
        </div>
      )}

      {currentStep === 5 && (
        <div>
          <h2>Confirmation</h2>
          <Alert variant="success">
            Thank you for your order! Your order number is 123456789.
          </Alert>
          <p>Estimated Delivery Date: 2024-08-01</p>
          <p>If you have any questions, please contact our customer support.</p>
        </div>
      )}
    </Container>
  );
};

export default Checkout;
