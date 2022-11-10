import React, { useContext, useState } from 'react';
import { AuthProvider } from '../../../userContext/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
    const {user, resetpassword, login} = useContext(AuthProvider);
    const [error, setError ] = useState("");


    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
        .then(res => {
            form.reset();
            toast.success('Login Success');
            navigate(from, {replace:true})

        })
        .catch(error => {
            setError(error.message)
        })
    } 
    

    const handleResetPassword = () =>{
        const newpasswordValue = prompt('Please Enter your Email');

        if(newpasswordValue){
            resetpassword(newpasswordValue)
            .then(res => {
                alert('Please Check your Email And Reset Your Password')
            })
            .catch(error =>{
                toast(error.message);
            })
        }

    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                                <p className='text-red-500'>{error}</p>
                            <label className="label">
                                <p>If you have no account please <Link to='/register' className='link text-blue-500'>Create Account</Link></p>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;