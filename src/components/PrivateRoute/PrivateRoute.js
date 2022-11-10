import React, { Children, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '../../userContext/UserContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthProvider);

    const location = useLocation();
    if(loading) {
        return <div className='text-center my-4'><button className="btn loading text-center rounded ">loading</button></div>
    }

    if(user){
        return children;
    }
    return <Navigate state={{from:location}} replace to='/login'></Navigate>
};

export default PrivateRoute;