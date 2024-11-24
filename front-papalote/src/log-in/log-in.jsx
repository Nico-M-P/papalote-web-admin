import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase/firebase'; // Adjust the path as needed
import { doc, getDoc } from 'firebase/firestore';
import '../styles/log-in.css'; // Adjust the path as needed

// cuenta de prueba:
// fidel.morales.briones@gmail.com
// 123abc

const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            // Intentar iniciar sesión
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Verificar si el usuario es admin
            const userDoc = await getDoc(doc(firestore, 'users', user.uid));
            if (userDoc.exists()) {
                console.log('User document data:', userDoc.data());
                if (userDoc.data().admin === true) {
                    navigate('/home'); // Redirigir a la página de dashboard
                } else {
                    setError('No tienes permisos de administrador.');
                }
            } else {
                setError('Usuario no encontrado.');
            }
        } catch (error) {
            console.error('Error signing in with password and email', error);
            setError('Error al iniciar sesión: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login__container">
            <div>
                <div className="login-logo__container">
                    <img src="/Logo-Papalote.png" alt="Logo" />
                </div>
                <div>
                    <h1>Iniciar Sesión</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div style={{ margin: '10px' }}>
                            <label>
                                <input
                                    type="text"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="Correo electrónico"
                                    style={{ color: 'black' }}
                                />
                            </label>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <label>
                                <input
                                    type="password"
                                    name="password"
                                    ref={passwordRef}
                                    placeholder="Contraseña"
                                    style={{ color: 'black' }}
                                />
                            </label>
                        </div>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <div style={{ margin: '10px' }}>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Cargando...' : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;