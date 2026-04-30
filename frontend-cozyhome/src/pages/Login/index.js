import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./index.css";

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // evita doble click

    setLoading(true);

    try {
      const response = await fetch("https://backend-cozyhome.onrender.com/api/clients/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correo: form.email,
          contrasena: form.password,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || data.error || "Error en el login");
        setLoading(false);
        return;
      }

      // 🔥 Guardado rápido
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      window.dispatchEvent(new Event("userChanged"));

      // 🔥 SIN RECARGAR LA APP
      if (data.user.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/productos");
      }

    } catch (error) {
      console.error("Error de login:", error);
      alert("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
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
              <label>Email address</label>
              <input
                className="cozy-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="cozy-input-group">
              <label>Password</label>
              <input
                className="cozy-input"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <p style={{ marginTop: "10px" }}>
              <Link to="/cambiar-contrasena" className="cozy-link-inline">
                Cambiar contraseña
              </Link>
            </p>

            <button 
              type="submit" 
              className="cozy-button"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Sign in"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
