

import api from '../../../api';

export function getUserDetails() {
    // Kullanıcı bilgilerini getir
    // return fetch('/api/user').then(res => res.json());
}

export function getUserOrders() {
    // Kullanıcı siparişlerini getir
    // return fetch('/api/orders').then(res => res.json());
}


// Kullanıcının kayıtlı adreslerini getir
export const getSavedAddresses = async () => {
    try {
        const response = await api.get(`/addresses`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Yeni bir adres ekleyin
export const addSavedAddress = async (userId, addressData) => {
    try {
        const response = await api.post(`/users/${userId}/addresses`, addressData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Bir adresi güncelleyin
export const updateSavedAddress = async (userId, addressId, addressData) => {
    try {
        const response = await api.put(`/users/${userId}/addresses/${addressId}`, addressData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Bir adresi silin
export const deleteSavedAddress = async (userId, addressId) => {
    try {
        const response = await api.delete(`/users/${userId}/addresses/${addressId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
