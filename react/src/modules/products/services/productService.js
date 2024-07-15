import api from '../../../api';

// Tüm ürünleri getirir
export const getAllProducts = async () => {
    try {
        const response = await api.get('/products');
       
        
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Tüm kategorileri getirir
export const getAllCategories = async () => {
    try {
        const response = await api.get('/products/categories');
        if (response.status === 200) {
            const categories = {};
            response.data.forEach(item => {
                if (!categories[item.category]) {
                    categories[item.category] = "";
                }
            });
            return Object.keys(categories);
        }
        return null;
    } catch (error) {
        throw error.response.data;
    }
};

// Öne çıkan ürünleri getirir
export const getAllFeaturedProducts = async () => {
    try {
        const response = await api.get('/products/featured');
        return response.data
    } catch (error) {
        throw error;
    }
};

// Belirtilen ID'ye sahip ürünü getirir
export const getProductById = async (productId) => {
    try {
        const response = await api.get(`/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Belirtilen ürün slug'ına sahip ürünü getirir
export const getProductBySlug = async (productSlug) => {
    try {
        const response = await api.get(`/products/slug/${productSlug}`);
        return response.status === 200 ? response.data : null;
    } catch (error) {
        throw error.response.data;
    }
};

// Belirtilen kategoriye göre ürünleri getirir
export const getProductsByCategory = async (category) => {
    try {
        const response = await api.get(`/products/category/${category}`);
        return response.status === 200 ? response.data : null;
    } catch (error) {
        throw error.response.data;
    }
};

// Belirtilen kategori slug'ına sahip ürünleri getirir
export const getProductsByCategorySlug = async (categorySlug) => {
    try {
        const response = await api.get(`/products/category/slug/${categorySlug}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
