import React, { useContext, useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../userContext/UserContext';
import Banner from './Banner/Banner';
import Service from './Service/Service';
const Home = () => {
    const [services, setServices] = useState([]);
    const { user, } = useContext(AuthProvider);

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
        fetch('http://localhost:5000/homeServices')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
    }, [])

    return (
        <div>
            <Banner></Banner>

            {loading ?
                <div className='text-center my-5'><button className="btn loading rounded">loading</button></div>
                :
                <div className='home-services py-10'>
                    <h1 className='text-center text-3xl mb-3'>Services</h1>
                    <div className='services-item grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            services?.map(service => <Service handleRemoveService={handleRemoveService} key={service._id} service={service}></Service>)
                        }
                    </div>
                    <div className='text-center my-10'>
                        <Link to='/services'><button className="btn btn-info rounded">See More</button></Link>
                    </div>
                </div>
            }
            <div className="hero py-36 bg-base-200">
                <div className="hero-content grid grid-cols-1 md:grid-cols-2">
                    <PhotoProvider>
                        <PhotoView src='https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/05/Food-Deliver-Biker-Delivering-Food.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5'>
                            <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/05/Food-Deliver-Biker-Delivering-Food.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5" />
                        </PhotoView>
                    </PhotoProvider>
                    <div>
                        <h1 className="text-3xl font-bold">What Is the Best Food Delivery App for Android?</h1>
                        <p className="py-6">Online food delivery has been going on for a while but has really grown in popularity over the last few years. Now food delivery apps are essential because of their convenience and seamless dispatch.</p>
                        <a target="_blank" href="https://www.makeuseof.com/best-food-delivery-android-app/"><button className="btn btn-primary rounded">Read More</button></a>
                    </div>
                </div>
            </div>

            <div className="hero">
                <iframe width="100%" height="500" src="https://www.youtube.com/embed/AN524IrRcW0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

        </div>
    );
};

export default Home;