// Örnek bir payment servis dosyası
import { processPayment } from '../utils/paymentService';

export const makePayment = (paymentDetails) => {
    // Ödeme yapılacak servis çağrısı
    processPayment(paymentDetails);
    // Burada servis çağrılarını yapabilirsiniz, API'ye istek gönderilebilir.
};
