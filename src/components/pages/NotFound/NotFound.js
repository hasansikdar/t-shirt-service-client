import React from 'react';
import errorImg from '../../../Assests/ErrorPage/Frame.png';

const NotFound = () => {
    return (
        <div className='py-10 mx-auto text-center'>
            <img className='mx-auto' src={errorImg} alt="" />
        </div>
    );
};

export default NotFound;