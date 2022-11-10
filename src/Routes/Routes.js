import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AddService from '../components/pages/AddService/AddService';
import Blog from '../components/pages/Blog/Blog';
import Home from '../components/pages/Home/Home';
import ServiceDetails from '../components/pages/Home/Service/ServiceDetails/ServiceDetails';
import Login from '../components/pages/Login/Login';
import MyReviews from '../components/pages/MyReviews/MyReviews';
import NotFound from '../components/pages/NotFound/NotFound';
import Profile from '../components/pages/Profile/Profile';
import Services from '../components/pages/Services/Services';
import Signup from '../components/pages/Signup/Signup';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
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
                element: <PrivateRoute><AddService></AddService></PrivateRoute>
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
            },
            {
                path: '/services/:id',
                element: <PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
            },
            {
                path: '/myreviews',
                element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
])