import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

const Modal = () => {
    const reviewItem = useLoaderData();

    const handleupdateReview = event => {
        event.preventDefault();
        const form = event.target;
        const updatevalue = form.updatevalue.value;


        fetch(`http://localhost:5000/updateReview/${reviewItem?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ updatevalue })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('updated successful')
                }
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Update Review</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onClick={handleupdateReview}  action="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Review</span>
                                </label>
                                <input name="updatevalue" defaultValue={reviewItem?.review} type="text" placeholder="Review" className="input input-bordered" />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;