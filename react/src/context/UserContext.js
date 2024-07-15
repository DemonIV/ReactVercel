import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getSavedAddresses, addSavedAddress, updateSavedAddress, deleteSavedAddress } from '../modules/user/services/userService'; // Kullanıcı servis fonksiyonlarını import edin

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [addresses, setAddresses] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchAddresses();
            console.log(user);
        } else {
            setAddresses([]);
        }
    }, [user]);

    const fetchAddresses = async () => {
        try {
            const fetchedAddresses = await getSavedAddresses();
            setAddresses(fetchedAddresses);
            console.log(fetchedAddresses);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleAddAddress = async (addressData) => {
        try {
            const newAddress = await addSavedAddress(user._id, addressData);
            setAddresses([...addresses, newAddress]);
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const handleUpdateAddress = async (addressId, addressData) => {
        try {
            const updatedAddress = await updateSavedAddress(user._id, addressId, addressData);
            const updatedAddresses = addresses.map(addr => addr._id === addressId ? updatedAddress : addr);
            setAddresses(updatedAddresses);
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            await deleteSavedAddress(user._id, addressId);
            const filteredAddresses = addresses.filter(addr => addr._id !== addressId);
            setAddresses(filteredAddresses);
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };

    return (
        <UserContext.Provider value={{ addresses, handleAddAddress, handleUpdateAddress, handleDeleteAddress }}>
            {children}
        </UserContext.Provider>
    );
}
