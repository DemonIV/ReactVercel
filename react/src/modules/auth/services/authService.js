import api from '../../../api';

export const signUp = async (data) => {
    try {
        const response = await api.post('/auth/signup', data);
        const accessToken = response.data["accessToken"];
        const refreshToken = response.data["refreshToken"];
    
        // Store the tokens in localStorage for later use
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const signIn = async (data) => {
    try {
        const { login, password } = data;
        console.log({data});
        const response = await api.post('/auth/signin', { login, password });
        console.log("AUTH",response);
        // const accessToken = response.data["accessToken"];
        // const refreshToken = response.data["refreshToken"];
    
        // // Store the tokens in localStorage for later use
        // localStorage.setItem('token', accessToken);
        // localStorage.setItem('refreshToken', refreshToken);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
};

export const signOut = async () => {
    try {
        const response = await api.get('/auth/signout');
        // Clear tokens from localStorage when signing out
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};