import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../../userContext/UserContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';






const Signup = () => {
    const { user, createUser, updateUserProfile } = useContext(AuthProvider);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [error, setError] = useState('');

    const handleCreateUser = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.files[0];
        const password = form.password.value;

        // upload photo 
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
                createUser(email, password)
                    .then(res => {
                        const user = res.user;
                        updateprofileinfo(profileInfo);
                        toast('User Create Successful')
                        form.reset();
                        navigate('/login');

                    })
                    .then(error => console.log(error))


                const updateprofileinfo = info => {
                    updateUserProfile(info)
                        .then(res => {
                            const user = res.user;
                            toast.success('User Profile Update Success');
                        })
                        .then(error => console.log(error));
                }


            })

    }


    

    //     createUser(email, password)
    //     .then(res => {
    //         const user = res.user;
    //         updateprofileinfo(profileInfo);
    //         toast('User Create Successful')
    //         form.reset();
    //         navigate('/login');

    //     })
    //     .then(error => console.log(error))




    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Create An Account!!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleCreateUser} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" required placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input name="image" type="file" accept='image/*' required className="" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input required name="email" type="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" required type="password" placeholder="password" className="input input-bordered" />
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Are you Agree With our Terms</span>
                                    <input className='input-checkbox' type="checkbox" />
                                </label>
                            </div>
                            <label className="label">
                                <p className='text-red-500'>{error}</p>
                            </label>
                            <label className="label">
                                <p>If you have and Account please <Link className='link text-blue-500' to='/login'>Log In</Link></p>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            <Helmet>
                <title>Register</title>
            </Helmet>
        </div>
    );
};

export default Signup;