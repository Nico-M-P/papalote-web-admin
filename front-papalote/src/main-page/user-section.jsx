import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import LogOutIcon from '../assets/Icon.svg';
import EditFotoIcon from '../assets/border_color.svg';
import '../styles/user-section.css';

const UserSection = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                // Fetch additional user data from Firestore
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            } else {
                setUser(null);
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        console.log('handleLogout called');
        const auth = getAuth();
        try {
            await signOut(auth);
            console.log('User signed out successfully');
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="user-section__body">
            <div className="user-section__container">
                <div className="user-section__profile-picture">
                    <img src={userData ? userData.profilePicture : "https://via.placeholder.com/150"} alt="User" className="profile-picture" />
                    <button className='edit-profile-picture__button'>
                        <img src={EditFotoIcon} alt="Edit" className='edit-profile-picture__icon' />
                    </button>
                </div>
                <div className='profile-username__container'>
                    <span>{userData ? userData.fullName : "Nombre del Usuario"}</span>
                </div>
                <div className='profile-id__container'>
                    <div>
                        <p>ID Empleado</p>
                    </div>
                    <div>
                        <span>{user ? user.uid : "123456"}</span>
                    </div>
                    <div style={{borderBottom: "1px solid #000"}} />
                </div>
                <div className='logout__container'>
                    <div>
                        <button onClick={handleLogout}>
                            <img src={LogOutIcon} alt="Log Out" />
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSection;