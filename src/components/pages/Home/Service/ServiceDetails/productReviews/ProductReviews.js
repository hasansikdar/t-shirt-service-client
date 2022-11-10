import React from 'react';

const ProductReviews = ({ userReview, handleReviewDelete }) => {
    const { userName, userProfile, date, rating, review, _id } = userReview;
    return (
        <div className='border-black p-2 my-2 rounded border'>
            <h3 className='text-2xl'>Rating: {rating} Start</h3>
            <div className='flex my-2'>
                <img className='w-10 h-10 rounded-full' src={userProfile} alt="" />
                <h3 className='text-2xl ml-2'>{userName}</h3>
                <p className='ml-4'>{date}</p>
            </div>
            <p>Review: {review}</p><br></br>
            <button className="btn btn-sm btn-info mr-2 rounded">Edit</button>
            <button onClick={() => handleReviewDelete(_id)} className="btn btn-sm btn-error rounded">Delete</button>
        </div>
    );
};

export default ProductReviews;