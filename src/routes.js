import React from 'react';
import { Navigate } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import SignInScreen from './screens/SignInScreen';

const routes = [
    {
        path: 'app',
        element: <DashboardLayout />,
        children: [
            { path: 'account', element: <ProductScreen /> }
        ]
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'login', element: <SignInScreen /> },
            { path: '/', element: <Navigate to="/app/dashboard" /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    }
];

export default routes;