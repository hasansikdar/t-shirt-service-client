import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../userContext/UserContext';
import Service from '../Home/Service/Service';
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const { user } = useContext(AuthProvider);
    const [loading, setLoading] = useState(true);


    const handleRemoveService = id => {
        const agreeDelete = window.confirm('Are You sure you want to delete ?')
        if (agreeDelete) {
            fetch(`http://localhost:5000/services/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast("Service delete successful");
                        const remaining = services.filter(service => service._id !== id);
                        setServices(remaining);
                    }
                })
        }
    }





    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
    }, [])


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