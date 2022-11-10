import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../userContext/UserContext';
import ProductReviews from '../Home/Service/ServiceDetails/productReviews/ProductReviews';

const MyReviews = () => {

    const {user} = useContext(AuthProvider);
    const [myReviews, setMyreviews] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`http://localhost:5000/myReviews?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
            setMyreviews(data)
            setLoading(false);
        });
    },[user?.email])

    const handleReviewDelete = id => {
        const agree = window.confirm('Are You sure You want Delete');
        if (agree) {
            fetch(`http://localhost:5000/productReviews/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast('Deleted Review');
                        const remainningReviews = myReviews.filter(r => r._id !== id);
                        setMyreviews(remainningReviews);
                        
                    }
                })
        }


    }



    return (
        <div className='w-10/12 mx-auto py-14'>
            <h1 className='text-5xl text-center mb-10'>My Reviews</h1>
            {loading ?
                <div className='text-center my-5'>
                    <button className="btn loading">loading</button>
                </div>
                :
                <>
                    {myReviews.length === 0 ?
                    <h1 className='text-3xl text-center mt-3'>No Reviews Available here</h1>
                    :
                    myReviews.map(review => <ProductReviews handleReviewDelete={handleReviewDelete} kye={review._id} userReview={review}></ProductReviews>)
                    }
                </>
            }
            <Helmet>
                <title>My Reviews</title>
            </Helmet>
        </div>
    );
};

export default MyReviews;