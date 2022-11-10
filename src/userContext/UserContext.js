import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from 'firebase/auth';
import app from '../../src/firebase/firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthProvider = createContext(app);
const auth = getAuth(app)
const UserContext = ({ children }) => {
    // const navigate = useNavigate();

    const [user, SetUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUserProfile = (userInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo);
    }
    const logout = () => {
        setLoading(true);
        const agree = window.confirm('Are You sure you want to Log Out');
        if (agree) {
            return signOut(auth);
            
        }
    }
    const resetpassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }
    const loginwithgoogle = (provider) =>{
        return signInWithPopup(auth, provider);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            SetUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])



    const authInfo = {loading, loginwithgoogle, user, resetpassword, createUser, login, updateUserProfile, logout }
    return (
        <AuthProvider.Provider value={authInfo}>
            {children}
        </AuthProvider.Provider>
    );
};

export default UserContext;