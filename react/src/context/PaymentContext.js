import React, { createContext, useContext, useState } from 'react';
import { makePayment } from '../modules/payment/services/paymentService';

// Context oluşturulması
const PaymentContext = createContext();

// Provider oluşturulması
export const PaymentProvider = ({ children }) => {
    const [paymentInfo, setPaymentInfo] = useState({
        paymentMethod: 'Credit Card',
    });

    const handlePayment = () => {
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

    return (
        <PaymentContext.Provider
            value={{
                paymentInfo,
                handlePayment,
                handleInputChange,
            }}
        >
            {children}
        </PaymentContext.Provider>
    );
};

// Custom hook oluşturulması
export const usePaymentContext = () => {
    return useContext(PaymentContext);
};
