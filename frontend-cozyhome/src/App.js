import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login'
import Registro from './pages/Registro' 
import {Link} from 'react-router-dom'
import { Routes, Route } from "react-router-dom";

export default function MyApp() {
  return (
      <div>        
          <section>
             
              <nav className="navbar" style={{ backgroundColor: "#f6f8f8", border: "1px solid black" }}>
              <form className="container-fluid justify-content-start">
              <h5 className="">Cozy home</h5>
              <a class="navbar-brand" href="#">Carrito</a>
              <a class="navbar-brand" href="#">Productos</a>
              <a class="navbar-brand" href="#">Diseños</a>
                <Link to ='/Login'>
                <button className="btn btn-outline-success me-2" type="button">Login in</button>
                </Link>
                <Link to ='/Registro'>
                <button className="btn btn-sm btn-outline-secondary" type="button">Registrarse</button>
                </Link>
              </form>
              </nav>
          </section>   
            <Routes>
            <Route path="/login" element={<Login />} />
            </Routes> 
            <Routes>
            <Route path="/Registro" element={<Registro />} />
            </Routes> 
      </div>
  );
}
