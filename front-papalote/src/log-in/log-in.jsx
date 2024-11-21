import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/log-in.css';

function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica de autenticación
        // Si la autenticación es exitosa, redirige a la página de inicio
        navigate("/home");
    };

    return (
        <div className="login__container">
            <div>
                <div className="login-logo__container">
                    <img src="./public/Logo-Papalote.png" />
                </div>
                <div>
                    <h1>Iniciar Sesion</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div style={{margin: "10px"}}>
                            <label>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="Correo electrónico"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>
                        <div style={{margin: "10px"}}>
                            <label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Contraseña"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="login-button__container" style={{}}>
                            <button type="submit">Iniciar sesión</button>
                        </div>
                        <div className="login-forgotPassword__container">
                            <a href="/forgot-password">Olvidaste tu contraseña?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;