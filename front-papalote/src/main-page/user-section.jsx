import React, { Component } from 'react';
import LogOutIcon from '../assets/Icon.svg';
import EditFotoIcon from '../assets/border_color.svg';
import '../styles/user-section.css';

const UserSection = () => {
    return (
        <div className="user-section__body">
            <div className="user-section__container">
                <div className="user-section__profile-picture">
                    <img src="https://via.placeholder.com/150" alt="User" className="profile-picture" />
                    <button className='edit-profile-picture__button'>
                        <img src={EditFotoIcon} alt="Edit" className='edit-profile-picture__icon' />
                    </button>
                </div>
                <div className='profile-username__container'>
                    <span>Nombre del Usuario</span>
                </div>
                <div className='profile-id__container'>
                    <div>
                        <p>ID Empleado</p>
                    </div>
                    <div>
                        <span>123456</span>
                    </div>
                    <div style={{borderBottom: "1px solid #000"}} />
                </div>
                <div className='logout__container'>
                    <div>
                        <button>
                            <img src={LogOutIcon} alt="Log Out" />
                            Cerra sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSection;