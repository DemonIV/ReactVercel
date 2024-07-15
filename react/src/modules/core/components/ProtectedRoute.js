import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            element={user ? <Component /> : <Navigate to="/signin" replace />}
        />
    );
};

export default ProtectedRoute;
