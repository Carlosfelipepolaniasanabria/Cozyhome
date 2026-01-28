import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then(res => setProductos(res.data));
  }, []);

  // 🛒 AGREGAR AL CARRITO
  const comprarProducto = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    carritoActual.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    alert("Producto agregado al carrito 🛒");
  };

  return (
    <div className="container mt-4">
      <h2>Productos</h2>

      <div className="row">
        {productos.map(p => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm">

              <img
                src={`http://localhost:8000${p.imagen}`}
                className="card-img-top"
                alt={p.nombre}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5>{p.nombre}</h5>
                <p>{p.descripcion}</p>
                <strong>${p.precio}</strong>
              </div>

              <div className="card-footer d-flex gap-2">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => comprarProducto(p)}
                >
                  Comprar
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/sale")}
                >
                  🛒
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



