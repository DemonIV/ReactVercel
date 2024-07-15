import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useUser() {
    return useContext(AuthContext).user;
}
