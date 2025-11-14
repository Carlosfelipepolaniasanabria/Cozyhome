// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';       
import Productos from './pages/Productos';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

export default function MyApp() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg cozy-navbar">
        <div className="container-fluid navbar-container">
          <Link to="/" className="navbar-brand cozy-brand">
            Cozy Home
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{ border: '1px solid #a78c5d' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav me-auto">
              {/* 👇 Ahora usamos Link para ir a /productos */}
              <Link className="nav-link cozy-nav-link" to="/productos">
                Products
              </Link>
              <a className="nav-link cozy-nav-link" href="#">Rooms</a>
              <a className="nav-link cozy-nav-link" href="#">Inspiration</a>
              <a className="nav-link cozy-nav-link" href="#">Sale</a>
            </div>

            <form className="d-flex">
              <Link to="/login">
                <button className="btn cozy-btn-primary me-2" type="button">
                  Log in
                </button>
              </Link>

              <Link to="/registro">
                <button className="btn cozy-btn-secondary" type="button">
                  Register
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </div>
  );
}
