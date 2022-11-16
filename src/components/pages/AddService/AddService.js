import React, { useContext } from 'react';
import { AuthProvider } from '../../../userContext/UserContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const AddService = () => {

    const { user } = useContext(AuthProvider);


    const handleProductAdd = event => {
        event.preventDefault();
        const form = event.target;
        const productName = form.productName.value;
        const productPhoto = form.productPhoto.files[0];
        const productPrice = form.productPrice.value;
        const productDetails = form.productDetails.value;


        // upload photo 
        const formData = new FormData();
        formData.append('image', productPhoto);
        const url = "https://api.imgbb.com/1/upload?key=20479324d2295d17d9027f196b869026";
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {

                // send service product data in server 
                const service = {
                    productName,
                    productPhoto: data?.data?.display_url,
                    productPrice,
                    productDetails,
                    email: user?.email,
                }
                fetch('https://t-shirt-server.vercel.app/addService', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(service)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            form.reset();
                            toast.success("service Added Successful");
                        }
                    })


            })
            .catch(error => console.log(error))
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
                            <input name="productPhoto" type="file" className="" />
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