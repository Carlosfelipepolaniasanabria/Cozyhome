import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

// 🔥 Lazy loading (MEJORA CLAVE)
const Login = lazy(() => import('./pages/Login'));
const Registro = lazy(() => import('./pages/Registro'));
const Home = lazy(() => import('./pages/Home'));
const Productos = lazy(() => import('./pages/Productos'));
const Sale = lazy(() => import('./pages/Sale'));
const Pedidos = lazy(() => import('./pages/Pedidos'));
const Pago = lazy(() => import('./pages/Pago'));
const AnadirProductos = lazy(() => import('./pages/Admin/AnadirProductos'));
const CambiarContrasena = lazy(() => import('./pages/Cambiarcontrasena/cambiarcontrasena'));
const GuiaUso = lazy(() => import('./pages/GuiaUso/GuiaUso'));
const MostrarUsuarios = lazy(() => import('./pages/MostrarUsuarios/MostrarUsuarios'));

export default function MyApp() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarUsuario = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    cargarUsuario();

    window.addEventListener("userChanged", cargarUsuario);
    return () => window.removeEventListener("userChanged", cargarUsuario);
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    navigate('/'); // 🔥 SIN recargar
  };

  const esAdmin = user?.rol === "admin";

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg cozy-navbar">
        <div className="container-fluid navbar-container">
          <Link to="/" className="navbar-brand cozy-brand">
            Cozy Home
          </Link>

          <div className="collapse navbar-collapse show">
            <div className="navbar-nav me-auto">
              <Link className="nav-link cozy-nav-link" to="/productos">
                Productos
              </Link>

              <Link className="nav-link cozy-nav-link" to="/sale">
                Compra
              </Link>

              <Link className="nav-link cozy-nav-link" to="/pedidos">
                Pedidos Realizados
              </Link>

              <Link className="nav-link cozy-nav-link" to="/guia">
                Cómo usar la página
              </Link>

              {user && (
                <Link className="nav-link cozy-nav-link" to="/cambiar-contrasena">
                  Cambiar contraseña
                </Link>
              )}

              {esAdmin && (
                <>
                  <Link className="nav-link cozy-nav-link" to="/usuarios">
                    Gestionar Usuarios
                  </Link>

                  <Link className="nav-link cozy-nav-link" to="/guia-admin">
                    Guía admin
                  </Link>

                  <Link className="nav-link cozy-nav-link" to="/admin">
                    Panel admin
                  </Link>
                </>
              )}
            </div>

            <div className="d-flex align-items-center gap-2">
              {!user ? (
                <>
                  <Link to="/login">
                    <button className="btn cozy-btn-primary">
                      Log in
                    </button>
                  </Link>

                  <Link to="/registro">
                    <button className="btn cozy-btn-secondary">
                      Registrarse
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <span className="me-2">
                    Hola, <strong>{user?.primer_Nombre}</strong>
                  </span>

                  <button
                    className="btn btn-outline-dark"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 🔥 Suspense para lazy loading */}
      <Suspense fallback={<div style={{ padding: "20px" }}>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
          <Route path="/guia" element={<GuiaUso tipo="usuario" />} />
          <Route path="/guia-admin" element={<GuiaUso tipo="admin" />} />

          <Route
            path="/sale"
            element={
              <PrivateRoute user={user}>
                <Sale />
              </PrivateRoute>
            }
          />

          <Route
            path="/pedidos"
            element={
              <PrivateRoute user={user}>
                <Pedidos />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              esAdmin ? <AnadirProductos /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/usuarios"
            element={
              esAdmin ? <MostrarUsuarios /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
