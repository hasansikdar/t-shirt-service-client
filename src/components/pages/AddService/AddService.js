import React, { useContext } from 'react';
import { AuthProvider } from '../../../userContext/UserContext';
import {toast} from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const AddService = () => {

    const {user} = useContext(AuthProvider);


    const handleProductAdd = event =>{
        event.preventDefault();
        const form = event.target;
        const productName = form.productName.value;
        const productPhoto = form.productPhoto.value;
        const productPrice = form.productPrice.value;
        const productDetails = form.productDetails.value;

        const service = {
            productName,
            productPhoto,
            productPrice,
            productDetails,
            email: user?.email,
        }

        fetch('http://localhost:5000/addService',{
            method:'POST',
            headers: {
                'content-type':'application/json',
            },
            body: JSON.stringify(service)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                form.reset();
                toast.success("service Added Successful");
            }
        })

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Add Services</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleProductAdd} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Service Name</span>
                            </label>
                            <input name="productName" type="text" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Service Photo Url</span>
                            </label>
                            <input name="productPhoto" type="text" placeholder="Photo Url" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input name="productPrice" type="text" placeholder="Price" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Service Description</span>
                            </label>
                            <textarea name="productDetails" placeholder='Service Description' className='p-3' id="" cols="30" rows="10"></textarea>
                            <label className="label">
                                <p>Error Message</p>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add Service</button>
                        </div>
                    </form>
                </div>
            </div>
            <Helmet>
                <title>Add Service</title>
            </Helmet>
        </div>
    );
};

export default AddService;