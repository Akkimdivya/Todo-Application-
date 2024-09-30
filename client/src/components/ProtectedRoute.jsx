import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/User'; // Import your useAuth hook

const ProtectedRoute = ({ element }) => {
    const { user, loading } = useAuth(); // Get the user and loading state

    // If loading, you can show a loading spinner or a fallback component
    if (loading) {
        return <div>Loading...</div>;
    }

    // If the user is not authenticated, redirect them to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Otherwise, render the requested element
    return element;
};

export default ProtectedRoute;
