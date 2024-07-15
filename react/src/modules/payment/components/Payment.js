import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { usePaymentContext } from '../../../context/PaymentContext';

const Payment = () => {
    const { paymentInfo, handlePayment, handleInputChange } = usePaymentContext();

    return (
        <div>
            <h2>Payment Page</h2>
            <Form onSubmit={handlePayment}>
                <Form.Group controlId="paymentMethod">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Control
                        as="select"
                        name="paymentMethod"
                        value={paymentInfo.paymentMethod}
                        onChange={handleInputChange}
                    >
                        <option>Credit Card</option>
                        <option>PayPal</option>
                        <option>Bank Transfer</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Pay Now
                </Button>
            </Form>
        </div>
    );
};

export default Payment;
