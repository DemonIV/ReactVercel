import React, { createContext, useState } from 'react';

// Başlangıç değerleri
const initialAddress = {
  name: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  phoneNumber: ''
};

// Context oluşturma
export const CheckoutContext = createContext(); // bu reactin metoduyla oluşturduumuz context nesnesi

export const CheckoutProvider = ({ children }) => { // bu ise jsx elementi aslında bir react componenti 
  const [shippingAddress, setShippingAddress] = useState(initialAddress);
  const [billingAddress, setBillingAddress] = useState(initialAddress);
  const [contactInformation, setContactInformation] = useState('');
  const [standartShippingCost,setStandartShippingCost]=useState(70);
  return ( // bu ise bizim componetin render fonksiyonu burada dönderdiğimiz elementler render ediliyoraslında gördüğün üzere elemn CheckoutContext.Provider bu ve bu içine bir prop alıyor value diye bu propun içne json nesnesi veriliyor bu json verisi içerisinde stateler onların set fonksiyonları kendi yazdığın handlerları verebliyorsun bu propa verdiğin herşey bu providerın scope u altındaki componetnlerde useContext hooku ile kullanılabilir hale geliyor useContext işu şekilde kullanıyorsun useContext(YourContext) tamamdır öyleyse  kanka çok iyi anlattın anladım
   
    <CheckoutContext.Provider
      value={{
        shippingAddress,
        setShippingAddress,
        billingAddress,
        setBillingAddress,
        contactInformation,
        setContactInformation,
        standartShippingCost
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

