import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

export default function Pedidos() {

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.identificacion) {
      console.log("Usuario no encontrado en localStorage");
      setLoading(false);
      return;
    }

    axios
      .get(`https://backend-cozyhome.onrender.com/api/sales/user/${user.identificacion}`)
      .then(res => {
        console.log("Ventas recibidas:", res.data);
        setSales(res.data || []);
      })
      .catch(err => {
        console.error("Error al traer pedidos:", err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  if (loading) {
  return (
    <div className="pedidos-page">
      <div className="pedidos-container">
        <p>Cargando pedidos...</p>
      </div>
    </div>
  );
}

return (
  <div className="pedidos-page">
    <div className="pedidos-container">
      <h2>Mis pedidos</h2>

      {sales.length === 0 ? (
        <p>No has comprado aún</p>
      ) : (
        sales.map(sale => (
          <div key={sale.id_sale} className="pedido-card">
            <div className="pedido-header">
              Compra #{sale.id_sale}
            </div>

            <div className="pedido-body">
              <p>
                Total: $
                {Number(sale.total).toLocaleString("es-CO")}
              </p>

              <p className={`estado ${sale.estado?.toLowerCase()}`}>
                Estado: {sale.estado}
              </p>

              <ul className="pedido-list">
                {sale.detalles && sale.detalles.length > 0 ? (
                  sale.detalles.map(d => (
                    <li key={d.id_detail} className="pedido-item">
                      <strong>{d.nombre_producto}</strong>
                      <span>
                        ${Number(d.precio).toLocaleString("es-CO")}
                      </span>
                      <span>Cantidad: {d.cantidad}</span>
                    </li>
                  ))
                ) : (
                  <li className="pedido-item">
                    Sin detalles
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

}
