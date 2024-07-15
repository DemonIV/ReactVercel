import api from '../../../api';

// Profil bilgilerini getir
export const getProfile = async () => {
    try {
        const response = await api.get('/profile'); // API endpointini kullanarak profil bilgilerini getir
        console.error(response);
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

// Profil bilgilerini güncelle
export const updateProfile = async (userData) => {
    try {
        const response = await api.put('/profile', userData); // API endpointini kullanarak profil bilgilerini güncelle
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Profil fotoğrafını güncelle
export const updateProfilePhoto = async (formData) => {
    try {
        const response = await api.put('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Form verisi olarak gönder
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Şifreyi güncelle
export const updatePassword = async (passwordData) => {
    try {
        const response = await api.put('/profile/password', passwordData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

