import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:8000/API/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo: email,
                contrasena: password,
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error en el login");
            return;
        }

        alert("Login exitoso");

        console.log("Usuario logeado:", data.user);

        // Guardar usuario si quieres
        localStorage.setItem("user", JSON.stringify(data.user));

    } catch (error) {
        console.error("Error de login:", error);
        alert("No se pudo conectar con el servidor");
    }
};


    return(       
        <div className="login-page">
            <div className="cozy-login-container"> 
                <div className="cozy-header">
                    <h2 className="cozy-title">Welcome back</h2>
                    <p className="cozy-subtitle">
                        Or <Link to="/registro" className="cozy-link-inline">create an account</Link>
                    </p>
                </div>
                
                <section>
                    <form className="cozy-form" onSubmit={handleSubmit}>
                        <div className="cozy-input-group">
                            <label htmlFor="email">Email address</label>
                            <input 
                                id="email"
                                className="cozy-input"
                                type="email"
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="cozy-input-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password"
                                className="cozy-input"
                                type='password' 
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="cozy-options">
                            <div className="cozy-remember">
                                <input 
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>
                            <Link to="/forgot-password" className="cozy-link">Forgot your password?</Link>
                        </div>
                        
                        <button type="submit" className="cozy-button">Sign in</button>
                    </form>
                    
                    <div className="cozy-links">
                        <Link to="/" className="cozy-link">Back to Home</Link>
                    </div>
                </section>
            </div>
        </div>       
    );
}