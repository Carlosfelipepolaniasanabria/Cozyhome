import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sale() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("carrito");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("carrito", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, p) => sum + Number(p.precio), 0);

  const handlePay = async () => {
    try {
      console.log("🔥 CLICK PROCESAR PAGO");

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Debes iniciar sesión");
        navigate("/login");
        return;
      }

      if (cart.length === 0) {
        alert("Carrito vacío");
        return;
      }

      const res = await fetch("http://localhost:8000/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identificacion_usuario: user.identificacion,
          cart
        })
      });

      const data = await res.json();
      console.log("📡 RESPUESTA BACKEND:", data);

      if (!res.ok) {
        alert(data.message || "Error al procesar pago");
        return;
      }

      alert(`✅ Compra realizada | Venta #${data.id_sale}`);
      localStorage.removeItem("carrito");
      setCart([]);
      navigate("/productos");

    } catch (error) {
      console.error("❌ ERROR FRONTEND:", error);
      alert("Error grave al procesar pago");
    }
  };

  return (
    <div className="container mt-4">
      <h2>🛒 Carrito de compras</h2>
      {cart.length === 0 ? (
        <>
          <p>No hay productos en el carrito</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/productos")}
          >
            Volver a productos
          </button>
        </>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((p, i) => (
                <tr key={i}>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>
                    <img
                      src={`http://localhost:8000${p.imagen}`}
                      width="80"
                      alt={p.nombre}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(i)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>Total: ${total.toLocaleString("es-CO")}</h4>

          <button
            type="button"
            className="btn btn-success mt-3"
            onClick={handlePay}
          >
            Proceder al pago
          </button>
        </>
      )}
    </div>
  );
}
