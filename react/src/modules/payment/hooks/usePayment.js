import { useState } from 'react';
import { makePayment } from '../services/paymentService';

export const usePayment = () => {
    const [paymentInfo, setPaymentInfo] = useState({
        paymentMethod: 'Credit Card',
    });

    const handlePayment = (event) => {
        event.preventDefault();
        // Ödeme işlemini yap
        makePayment(paymentInfo);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPaymentInfo({
            ...paymentInfo,
            [name]: value,
        });
    };

    return {
        paymentInfo,
        handlePayment,
        handleInputChange,
    };
};
