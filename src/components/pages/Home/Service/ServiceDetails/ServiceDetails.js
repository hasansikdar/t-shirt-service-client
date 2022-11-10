import React, { useContext, useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { json, Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../../../userContext/UserContext';
import ProductReviews from './productReviews/ProductReviews';

const ServiceDetails = () => {
    const { user } = useContext(AuthProvider);
    const service = useLoaderData();
    const { productName, productPhoto, productDetails, _id, productPrice, email } = service;
    const [productReviewses, setProductReviewses] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleAddReview = event => {
        event.preventDefault();
        const form = event.target;
        const rating = form.rating.value;
        const review = form.review.value;



        const userReview = {
            rating,
            review,
            userName: user?.displayName,
            userProfile: user?.photoURL,
            serviceID: _id,
            userEmail: user?.email,
        }
        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userReview)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Thank You For Review');
                    form.reset();
                    const Addreviews = [...productReviewses, userReview]
                    setProductReviewses(Addreviews);
                }
            })

    }

    useEffect(() => {
        fetch(`http://localhost:5000/productReviews?serviceID=${_id}`)
            .then(res => res.json())
            .then(data => {
                setProductReviewses(data);
            })
    }, [])



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
                        const remainningReviews = productReviewses.filter(r => r._id !== id);
                        setProductReviewses(remainningReviews);
                    }
                })
        }


    }

    return (
        <div>
            <div className='flex'>
                <div className="hero py-16 bg-base-200 w-9/12 ">
                    <div className="hero-content flex-col justify-between grid grid-cols-1 md:grid-cols-2  lg:flex-row">
                        <PhotoProvider>
                            <PhotoView src={productPhoto}>
                                <img src={productPhoto} className="w-10/12 rounded-lg shadow-2xl" />
                            </PhotoView>
                        </PhotoProvider>
                        <div className='w-10/12'>
                            <h1 className="text-5xl font-bold">{productName}</h1>
                            <p className="py-6">{productDetails}</p>
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className='p-2'>
                    {user?.email ?
                        <form onSubmit={handleAddReview} action="">
                            <input type="text" placeholder="Rating Star ***" className="input w-full border-black	mb-2 max-w-xs rounded " required name="rating" />
                            <input type="text" placeholder="Review Please" className="input w-full border-black	mb-2 max-w-xs rounded " required name="review" /><br></br>
                            <button className="btn btn-active btn-primary rounded">Add Review</button>
                        </form>
                        :
                        <h1 className=''>Please Login Now For Add Review <br></br> <Link className='' to='/login'><button className='btn btn-info rounded'>Login</button></Link></h1>
                    }
                </div>
            </div>
            <div className='py-9 pl-5'>
                <h1 className='text-5xl'>Ratings & Reviews of {productName}</h1>
                <div className='flex my-3 py-5 border-4 w-1/4'>
                    <div>
                        <h1 className='text-3xl'>4.7/5</h1>
                    </div>
                    <div className='flex-col-reverse flex'>
                        <div className="rating rating-xs">
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <div className="rating rating-sm">
                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked />
                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <div className="rating rating-md">
                            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked />
                            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <div className="rating rating-lg">
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked />
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                        </div>
                    </div>
                </div>
                <h3 className='border-b-2'>Reviews</h3>
                <div>
                    {
                        productReviewses.map(review => <ProductReviews handleReviewDelete={handleReviewDelete} key={review._id} userReview={review}></ProductReviews>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;