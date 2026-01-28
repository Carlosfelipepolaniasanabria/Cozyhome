import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Sale from './pages/Sale';
import AnadirProductos from './pages/Admin/AnadirProductos';

import PrivateRoute from './components/PrivateRoute';

export default function MyApp() {
  const [user, setUser] = useState(null);

  // 🔐 Detectar sesión
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🚪 Cerrar sesión
  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg cozy-navbar">
        <div className="container-fluid navbar-container">

          <Link to="/" className="navbar-brand cozy-brand">
            Cozy Home
          </Link>

          <div className="collapse navbar-collapse">

            <div className="navbar-nav me-auto">
              <Link className="nav-link cozy-nav-link" to="/productos">
                Products
              </Link>

              <a className="nav-link cozy-nav-link" href="#">
                Inspiration
              </a>

              <Link className="nav-link cozy-nav-link" to="/sale">
                Sale
              </Link>
            </div>

            {/* ZONA DERECHA */}
            <div className="d-flex align-items-center gap-2">

              {!user && (
                <>
                  <Link to="/login">
                    <button className="btn cozy-btn-primary">
                      Log in
                    </button>
                  </Link>

                  <Link to="/registro">
                    <button className="btn cozy-btn-secondary">
                      Register
                    </button>
                  </Link>
                </>
              )}

              {user && (
                <>
                  <span className="me-2">
                    Hola, <strong>{user.primer_Nombre}</strong>
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

      {/* RUTAS */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* 🔐 RUTA PROTEGIDA */}
        <Route
          path="/sale"
          element={
            <PrivateRoute>
              <Sale />
            </PrivateRoute>
          }
        />

        <Route path="/admin" element={<AnadirProductos />} />
      </Routes>

    </div>
  );
}

