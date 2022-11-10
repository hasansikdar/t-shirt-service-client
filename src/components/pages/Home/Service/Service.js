import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const Service = ({ service, handleRemoveService }) => {
    const { productName, productPrice, _id, productPhoto, productDetails } = service;







    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <PhotoProvider>
                    <PhotoView src={productPhoto}>
                        <img src={productPhoto} alt="Shoes" className="rounded-xl" />
                    </PhotoView>
                </PhotoProvider>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{productName}</h2>
                <p>{productDetails.length > 100 && productDetails.slice(0, 100) + "..."}</p>
                <h4>Price: ${productPrice}</h4>
                <div className="rating">
                    <input type="radio" name="rating-1" className="mask mask-star" />
                    <input type="radio" name="rating-1" className="mask mask-star" checked />
                    <input type="radio" name="rating-1" className="mask mask-star" />
                    <input type="radio" name="rating-1" className="mask mask-star" />
                    <input type="radio" name="rating-1" className="mask mask-star" />
                </div>
                <div className="card-actions mt-4">
                    <Link to={`/services/${_id}`}><button className="btn btn-primary rounded">Details</button><br></br></Link>
                    <button onClick={() => handleRemoveService(_id)} className="btn btn-error rounded">Remove</button>
                </div>
            </div>
        </div>
    );
};

export default Service;