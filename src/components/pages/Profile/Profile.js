import React, { useContext } from 'react';
import { AuthProvider } from '../../../userContext/UserContext';
import {toast} from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
    const {user, updateUserProfile} = useContext(AuthProvider);


    const handleUpdate = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value;
        
        const profileInfo = {
            displayName:name,
            photoURL:photoUrl,
        }
        
        updateUserProfile(profileInfo)
        .then(res => {
            form.reset();
            alert('Profile Update Success');
            toast.success("User Profile Updated");
        })
        .then(error => toast(error.message))

    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Update Profile</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleUpdate} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input defaultValue={user?.displayName} name="name" type="text" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input name="photoUrl" defaultValue={user?.photoURL}  type="text" placeholder="Photo Url" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input readOnly defaultValue={user?.email} name="email" type="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Update Now</button>
                        </div>
                    </form>
                </div>
            </div>
            <Helmet>
                <title>Profile Update</title>
            </Helmet>
        </div>
    );
};

export default Profile;