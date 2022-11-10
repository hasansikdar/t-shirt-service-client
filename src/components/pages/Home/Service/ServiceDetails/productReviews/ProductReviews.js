import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductReviews = ({ userReview, handleReviewDelete }) => {
    const { userName, userProfile, date, rating, review, _id } = userReview;
    const [reviewupdate, setReviewUpdate] = useState(review)
    const [editId, setEditId] = useState('')
    const handleReviewUpdate = event => {
        const updatedreview = event.target.value;
        // const reamanningReviews = [...reviewupdate,updatedreview ];
        setReviewUpdate(updatedreview)

    }

    console.log(editId);
    //     
    // }
    console.log(reviewupdate)
    const handleupdateReview = () => {

        fetch(`http://localhost:5000/updateReview/${editId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ reviewupdate })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('updated successful')
                }
            })
    }
    console.log(reviewupdate)
    return (
        <div className='border-black p-2 my-2 rounded border'>
            <h3 className='text-2xl'>Rating: {rating} Start</h3>
            <div className='flex my-2'>
                <img className='w-10 h-10 rounded-full' src={userProfile} alt="" />
                <h3 className='text-2xl ml-2'>{userName}</h3>
                <p className='ml-4'>{date}</p>
            </div>
            <p>Review: {reviewupdate}</p><br></br>
            
            <Link to={`/modal/${_id}`}><button className="btn btn-sm btn-info mr-2 rounded">Edit</button></Link>
            <button onClick={() => handleReviewDelete(_id)} className="btn btn-sm btn-error rounded">Delete</button>
        </div>
    );
};

export default ProductReviews;