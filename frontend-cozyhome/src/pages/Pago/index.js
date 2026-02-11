import { useEffect, useState } from "react";
import "./pago.css";

export default function PaymentForm() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [email, setEmail] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("Cédula");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [celular, setCelular] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cartToPay");
    const storedTotal = localStorage.getItem("totalToPay");
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedTotal) setTotal(Number(storedTotal));
  }, []);

  const handlePayment = async () => {
    if (!email || !nombres || !apellidos || !numeroDocumento || !celular) {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    if (cart.length === 0) {
      alert("Carrito vacío");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identificacion_usuario: numeroDocumento,
          cart: cart.map(p => ({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            cantidad: p.cantidad || 1
          })),
          total
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error al registrar la venta: " + data.message);
        return;
      }

      alert(`Pago realizado por $${total.toLocaleString("es-CO")} COP\nVenta ID: ${data.id_sale}`);

      localStorage.removeItem("cartToPay");
      localStorage.removeItem("totalToPay");
      localStorage.removeItem("carrito");
      setCart([]);
      setTotal(0);

    } catch (error) {
      console.error("ERROR FRONTEND:", error);
      alert("Ocurrió un error al procesar el pago.");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Cozy Home</h2>
        <p className="subtitle">Sistema de pagos</p>

        <label>Correo electrónico</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

        <div className="row">
          <div>
            <label>Nombres</label>
            <input type="text" value={nombres} onChange={e => setNombres(e.target.value)} />
          </div>
          <div>
            <label>Apellidos</label>
            <input type="text" value={apellidos} onChange={e => setApellidos(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Tipo de documento</label>
            <select value={tipoDocumento} onChange={e => setTipoDocumento(e.target.value)}>
              <option>Cédula</option>
              <option>Pasaporte</option>
            </select>
          </div>
          <div>
            <label>Número</label>
            <input type="text" value={numeroDocumento} onChange={e => setNumeroDocumento(e.target.value)} />
          </div>
        </div>

        <label>Celular</label>
        <input type="text" value={celular} onChange={e => setCelular(e.target.value)} />

        <button onClick={handlePayment}>
          Pagar ${total.toLocaleString("es-CO")}
        </button>
      </div>

      <div className="checkout-summary">
        <h3>Resumen</h3>

        {cart.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          cart.map((p, i) => (
            <div key={i} className="summary-item">
              <div>
                <strong>{p.nombre}</strong>
                <p>${Number(p.precio).toLocaleString("es-CO")}</p>
                <p>Cantidad: {p.cantidad || 1}</p>
              </div>
            </div>
          ))
        )}

        <hr />

        <div className="summary-total">
          <span>Total</span>
          <strong>${total.toLocaleString("es-CO")}</strong>
        </div>

        {/* 👇 PIE DE PÁGINA */}
        <div className="payment-footer">
          <p><strong>Importante:</strong></p>
          <p>
            Debes realizar el pago y enviar el comprobante vía WhatsApp al
            <strong> 320 536 8476</strong>.
          </p>
          <p>
            <strong>Métodos de pago:</strong><br />
            📱 Nequi: <strong>320 536 8476</strong><br />
            🏦 Bancolombia (Ahorros): <strong>03205368476</strong>
          </p>
          <p className="envio-text">
            Una vez verificado el pago, se procederá con el envío del mueble y por via WhatsApp nos confirma la dirección a la que debemos enviarlo. El tiempo de envío es dependiendo de tu ubicación, pero generalmente es de 3 a 5 días hábiles dentro de Colombia.
          </p>
        </div>
      </div>
    </div>
  );
}
