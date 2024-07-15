import api from "../../../api";

// Sepet bilgisini getir
export const getCartItems = async () => {
    try {
        const response = await api.get('/cart'); // Kullanıcının sepetini getir
        console.log(response);
        return response.data; // API'den gelen sepet verisi
    } catch (error) {
        throw error.response.data || error.message;
    }
};

// Sepete ürün ekle
export const addToCart = async ({product, color, size, quantity}) => {
    try {
        console.log("size",size);
        const response = await api.post('/cart/items', { product, color, size, quantity });
        return response.data; // Güncellenmiş sepet verisi
    } catch (error) {
        throw error.response.data || error.message;
    }
};

// Sepetten ürünü çıkar
export const removeFromCart = async (itemId) => {
    try {
        
        const response = await api.delete(`/cart/items/`,{data:{cartItemId:itemId}});
        return response.data; // Güncellenmiş sepet verisi
    } catch (error) {
        throw error.response.data || error.message;
    }
};

// Sepeti temizle
export const clearCart = async () => {
    try {
        const response = await api.delete('/cart/items/clear');
        return response.data; // Temizlenmiş sepet verisi
    } catch (error) {
        throw error.response.data || error.message;
    }
};
