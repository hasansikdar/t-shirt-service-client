import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AddService from '../components/pages/AddService/AddService';
import Blog from '../components/pages/Blog/Blog';
import Home from '../components/pages/Home/Home';
import Login from '../components/pages/Login/Login';
import NotFound from '../components/pages/NotFound/NotFound';
import Profile from '../components/pages/Profile/Profile';
import Services from '../components/pages/Services/Services';
import Signup from '../components/pages/Signup/Signup';
import Main from '../Layout/Main';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/add-service',
                element: <AddService></AddService>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Signup></Signup>
            },
            {
                path: '/services',
                element: <Services></Services>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
])