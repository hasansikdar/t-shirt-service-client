import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../userContext/UserContext';
import Service from '../Home/Service/Service';
import './Services.css';

const Services = () => {
    const { user, logout } = useContext(AuthProvider);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);


    

    // useEffect(() => {
    //     fetch(`https://t-shirt-server.vercel.app/services?email=${user?.email}`, {
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setServices(data);
    //             setLoading(false);
    //         })
    // }, [user?.email])
    
    // const { data: services = [], loading } = useQuery({
    //     queryKey: ['services', user?.email],
    //     queryFn: async () => {
    //         const res = await fetch(`https://t-shirt-server.vercel.app/services?email=${user?.email}`);
    //         const data = await res.json();
    //         console.log(data);
    //         return data;
    //     }
    // })




    const handleRemoveService = id => {
        const agreeDelete = window.confirm('Are You sure you want to delete ?')
        if (agreeDelete) {
            fetch(`https://t-shirt-server.vercel.app/services/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast("Service delete successful");
                        const remaining = services.filter(service => service._id !== id);

                    }
                })
        }
    }

 useEffect(() => {
        fetch(`https://t-shirt-server.vercel.app/services?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {

                setServices(data);
                setLoading(false);
            })
    }, [user?.email])

    // const { data: services = [], loading } = useQuery({
    //     queryKey: ['services', user?.email],
    //     queryFn: async () => {
    //         const res = await fetch(`https://t-shirt-server.vercel.app/services?email=${user?.email}`);
    //         const data = await res.json();
    //         console.log(data);
    //         return data;
    //     }
    // })





    return (
        <div className='w-11/12 mx-auto py-10'>
            <h1 className='text-4xl text-center mb-10'>Services</h1>
            {loading ?
                <div className='text-center my-4'><button className="btn loading rounded">loading</button></div>
                :

                <div className='services-item grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {
                        services.map(service => <Service handleRemoveService={handleRemoveService} key={service._id} service={service}></Service>)
                    }
                </div>
            }
            <Helmet>
                <title>Services</title>
            </Helmet>
        </div>
    );
};

export default Services;