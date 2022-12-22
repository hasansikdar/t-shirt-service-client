import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='p-2 lg:p-10 bg-base-200 text-base-content'>
            <footer className="footer p-10 bg-base-200 text-base-content">
                <div>
                    <img className='w-20' src="https://i.ibb.co/1qzDCgf/Logo.png" alt="" />
                    <p><span className='text-2xl font-bold'>Food Delivery</span><br />Easy & Fast Order From Home</p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <Link className="link link-hover">Branding</Link>
                    <Link className="link link-hover">Design</Link>
                    <Link className="link link-hover">Marketing</Link>
                    <Link className="link link-hover">Advertisement</Link>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <Link to='/services' className="link link-hover">Services</Link>
                    <Link to='/add-service' className="link link-hover">Add Service</Link>
                    <Link to='/myreviews' className="link link-hover">My Reviews</Link>
                    <Link to='/blog' className="link link-hover">Blog</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <Link className="link link-hover">Terms of use</Link>
                    <Link className="link link-hover">Privacy policy</Link>
                    <Link className="link link-hover">Cookie policy</Link>
                </div>
            </footer>
            <p className='text-center'>&copy;Copyright Muhammad Hasan | All Rights Reserved 2022</p>
        </div>
    );
};

export default Footer;