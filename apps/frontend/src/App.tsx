import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomePage from './routes/HomePage.tsx';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <div />,
            element: <HomePage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
