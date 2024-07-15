import React from 'react';
import { Container, Row, Col, FloatingLabel, Tooltip, OverlayTrigger } from 'react-bootstrap';

const ShippingBillingInfoBox = ({ shippingAddress, billingAddress, sameAsShipping }) => {
  return (
    <Container className="info-box" style={{ position: 'sticky', top: '20px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Row>
        <Col>
          <h3>Shipping Information Preview</h3>
          <p>Name: {shippingAddress.name}</p>
          <p>Address: {shippingAddress.addressLine1}, {shippingAddress.addressLine2}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
          <p>Phone Number: {shippingAddress.phoneNumber}</p>
        </Col>
      </Row>
      {!sameAsShipping && (
        <Row>
          <Col>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip-billing">Billing Information Preview</Tooltip>}
            >
              <h3>Billing Information Preview</h3>
            </OverlayTrigger>
            <p>Name: {billingAddress.name}</p>
            <p>Address: {billingAddress.addressLine1}, {billingAddress.addressLine2}, {billingAddress.city}, {billingAddress.state}, {billingAddress.postalCode}, {billingAddress.country}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ShippingBillingInfoBox;
