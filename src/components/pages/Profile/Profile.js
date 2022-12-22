import React, { useContext } from 'react';
import { AuthProvider } from '../../../userContext/UserContext';
import {toast} from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {user, updateUserProfile} = useContext(AuthProvider);

    const navigate = useNavigate();

    const handleUpdate = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const image = form.image.files[0];
        
        //upload photo in imgbb
        const formData = new FormData();
        formData.append('image', image);

        const url = 'https://api.imgbb.com/1/upload?key=20479324d2295d17d9027f196b869026';
        fetch(url, {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(data => {
            const profileInfo = {
                displayName: name,
                photoURL: data?.data?.display_url,
            }
            updateUserProfile(profileInfo)
            .then(res => {
                toast.success('Profile Update Success');
                form.reset();
                navigate('/')
            })
            .catch(error => console.log(error))

        })
        .catch(error => console.log(error))


        // const profileInfo = {
        //     displayName:name,
        //     photoURL:photoUrl,
        // }
        
        // updateUserProfile(profileInfo)
        // .then(res => {
        //     form.reset();
        //     alert('Profile Update Success');
        //     toast.success("User Profile Updated");
        // })
        // .then(error => toast(error.message))

    }


    return (
        <div className="min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold my-5">Update Profile</h1>
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
                                <span className="label-text">Upload Photo</span>
                            </label>
                            <input name="image"  type="file" accept='image/*' className="" />
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