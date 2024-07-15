import api from '../../../api'

export const getProductsByCategory = async (category) => {
    try {
        const response = await api.get(`/products/category/${category}`);

        return response? response.status===200? response.data : null:null;
    } catch (error) {
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const response = await api.get(`/categories`);

        return response? response.status===200? response.data : null:null;
    } catch (error) {
        console.log(error);
        throw error;
    }
};