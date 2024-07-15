import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, ProgressBar, Table, Alert, Card } from 'react-bootstrap';
import { CartContext } from '../../../context/CartContext';
import CartTable from './CartTable';
import { CheckoutContext } from '../../../context/CheckoutContext';
import { useForm } from 'react-hook-form'; // React Hook Form import edildi


import { Link } from 'react-router-dom';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { cart: cartItems } = useContext(CartContext);
  const { standartShippingCost } = useContext(CheckoutContext);

  const { register, handleSubmit, formState: { errors } } = useForm(); // useForm hook'u kullanıldı

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

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = standartShippingCost;
  const totalAmount = subtotal + shippingCost;

  const onSubmit = () => {
    setCurrentStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePlaceOrder = () => {
    if (!termsAccepted) {
      alert('Lütfen şartları ve koşulları kabul edin.');
      return;
    }
    setCurrentStep(4); // Ödeme bilgileri adımına geç
  };

  return (
    <Container>
      <header className="d-flex justify-content-between align-items-center py-3">
        <img src="url_to_logo_image" alt="Logo" />
        <nav>
          <a href="/">Ana Sayfa</a>
          <a href="/shop">Mağaza</a>
          <a href="/cart">Sepet</a>
          <a href="/profile">Profil</a>
        </nav>
        <div>
          <i className="fas fa-shopping-cart"></i> {cartItems.length}
        </div>
      </header>

      <ProgressBar now={(currentStep / 5) * 100} className="my-4" label={`Adım ${currentStep} / 5`} />

      {currentStep === 1 && (
        <div>
          <h2>Sepet İnceleme</h2>
          <CartTable cartItems={cartItems} />
          <Button variant="primary" onClick={handleNextStep}>Kargo Bilgilerine İlerle</Button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2>Kargo Bilgileri</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Adı</Form.Label>
                  <Form.Control type="text" name="name" {...register('name', { required: true })} />
                  {errors.name && <span>Ad zorunludur.</span>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="phoneNumber">
                  <Form.Label>Telefon Numarası</Form.Label>
                  <Form.Control type="text" name="phoneNumber" {...register('phoneNumber', { required: true })} />
                  {errors.phoneNumber && <span>Telefon numarası zorunludur.</span>}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="addressLine1">
              <Form.Label>Adres Satırı 1</Form.Label>
              <Form.Control type="text" name="addressLine1" {...register('addressLine1', { required: true })} />
              {errors.addressLine1 && <span>Adres satırı 1 zorunludur.</span>}
            </Form.Group>
            <Form.Group controlId="addressLine2">
              <Form.Label>Adres Satırı 2</Form.Label>
              <Form.Control type="text" name="addressLine2" {...register('addressLine2')} />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label>Şehir</Form.Label>
                  <Form.Control type="text" name="city" {...register('city', { required: true })} />
                  {errors.city && <span>Şehir zorunludur.</span>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="state">
                  <Form.Label>İl/İlçe</Form.Label>
                  <Form.Control type="text" name="state" {...register('state', { required: true })} />
                  {errors.state && <span>İl/İlçe zorunludur.</span>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="postalCode">
                  <Form.Label>Posta Kodu</Form.Label>
                  <Form.Control type="text" name="postalCode" {...register('postalCode', { required: true })} />
                  {errors.postalCode && <span>Posta kodu zorunludur.</span>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="country">
                  <Form.Label>Ülke</Form.Label>
                  <Form.Control as="select" name="country" {...register('country', { required: true })}>
                    <option value="">Ülke Seçiniz</option>
                    <option value="tr">Türkiye</option>
                  </Form.Control>
                  {errors.country && <span>Ülke seçimi zorunludur.</span>}
                </Form.Group>
              </Col>
            </Row>
            <h3>Kargo Yöntemi</h3>
            <Form.Check
              type="radio"
              label="Standart Kargo - ₺70"
              name="shippingMethod"
              value="standardShipping"
              checked={shippingMethod === 'standardShipping'}
              onChange={(e) => setShippingMethod(e.target.value)}
            />
            <Button variant="secondary" onClick={handlePreviousStep}>Geri</Button>{' '}
            <Button variant="primary" type="submit">Siparişi Gözden Geçir</Button>
          </Form>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h2>Sipariş İnceleme</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Miktar</th>
                <th>Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>₺{Number(item.product.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <p>Ara Toplam: ₺{subtotal.toFixed(2)}</p>
            <p>Kargo Ücreti: ₺{shippingCost.toFixed(2)}</p>
            <p>Toplam: ₺{totalAmount.toFixed(2)}</p>
          </div>
          <Form.Check
            type="checkbox" label={
              <span>
                <Link to="/terms" target="_blank">Şartları ve koşulları kabul ediyorum</Link>
              </span>
            }
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <Button variant="secondary" onClick={handlePreviousStep}>Geri</Button>{' '}
          <Button variant="primary" onClick={handlePlaceOrder}>Siparişi Tamamla</Button>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <h2>Ödeme Bilgileri</h2>
          <Card>
            <Card.Body>
              <iframe
                src="url_to_payment_gateway_iframe"
                width="100%"
                height="500px"
                title="Ödeme"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </Card.Body>
          </Card>
          <Button variant="secondary" onClick={handlePreviousStep}>Geri</Button>
        </div>
      )}

      {currentStep === 5 && (
        <div>
          <h2>Onay</h2>
          <Alert variant="success">
            Siparişiniz için teşekkür ederiz! Sipariş numaranız: 123456789.
          </Alert>
          <p>Tahmini Teslim Tarihi: 2024-08-01</p>
          <p>Herhangi bir sorunuz varsa lütfen müşteri hizmetleri ile iletişime geçin.</p>
        </div>
      )}

    </Container>
  );
};

export default Checkout;
