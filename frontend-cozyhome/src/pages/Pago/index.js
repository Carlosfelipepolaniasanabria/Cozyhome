import { useEffect, useState } from "react";
import "./pago.css";
import Swal from "sweetalert2";

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

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);

      const calculatedTotal = parsedCart.reduce(
        (sum, p) => sum + Number(p.precio) * Number(p.cantidad || 1),
        0
      );

      setTotal(calculatedTotal);
    }
  }, []);

  const handlePayment = async () => {
    if (!email || !nombres || !apellidos || !numeroDocumento || !celular) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos del formulario.",
        confirmButtonColor: "#7b2ff7"
      });
      return;
    }

    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "No hay productos en el carrito.",
        confirmButtonColor: "#7b2ff7"
      });
      return;
    }

    const totalCalculado = cart.reduce(
      (sum, p) => sum + Number(p.precio) * Number(p.cantidad || 1),
      0
    );

    try {
      const response = await fetch("https://backend-cozyhome.onrender.com/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identificacion_usuario: Number(numeroDocumento),
          cart: cart.map(p => ({
            id: p.id,
            nombre: p.nombre,
            imagen: p.imagen || "",
            precio: Number(p.precio),
            cantidad: p.cantidad || 1
          })),
          total: totalCalculado
        })
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error al registrar la venta",
          text: data.error || data.message || "Ocurrió un problema",
          confirmButtonColor: "#7b2ff7"
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Pago realizado",
        text: `Pago realizado por $${totalCalculado.toLocaleString("es-CO")} COP\nVenta ID: ${data.id_sale}`,
        confirmButtonColor: "#7b2ff7"
      });

      localStorage.removeItem("cartToPay");
      localStorage.removeItem("totalToPay");
      localStorage.removeItem("carrito");

      setCart([]);
      setTotal(0);
      setEmail("");
      setNombres("");
      setApellidos("");
      setTipoDocumento("Cédula");
      setNumeroDocumento("");
      setCelular("");

    } catch (error) {
      console.error("ERROR FRONTEND:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al procesar el pago.",
        confirmButtonColor: "#7b2ff7"
      });
    }
  };

  return (
    <div className="payment-page">
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Cozy Home</h2>
          <p className="subtitle">Sistema de pagos</p>

          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <div className="row_pago">
            <div>
              <label>Nombres</label>
              <input
                type="text"
                value={nombres}
                onChange={e => setNombres(e.target.value)}
              />
            </div>
            <div>
              <label>Apellidos</label>
              <input
                type="text"
                value={apellidos}
                onChange={e => setApellidos(e.target.value)}
              />
            </div>
          </div>

          <div className="row_pago">
            <div>
              <label>Tipo de documento</label>
              <select
                value={tipoDocumento}
                onChange={e => setTipoDocumento(e.target.value)}
              >
                <option>Cédula</option>
                <option>Pasaporte</option>
              </select>
            </div>
            <div>
              <label>Número</label>
              <input
                type="text"
                value={numeroDocumento}
                onChange={e => setNumeroDocumento(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>

          <label>Celular</label>
          <input
            type="text"
            value={celular}
            onChange={e => setCelular(e.target.value.replace(/\D/g, ""))}
          />

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
                <strong>{p.nombre}</strong>
                <p>Precio unitario: ${Number(p.precio).toLocaleString("es-CO")}</p>
                <p>Cantidad: {p.cantidad || 1}</p>
                <p>
                  Subtotal: $
                  {(Number(p.precio) * Number(p.cantidad || 1)).toLocaleString("es-CO")}
                </p>
              </div>
            ))
          )}

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toLocaleString("es-CO")}</strong>
          </div>

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
              Una vez verificado el pago, se procederá con el envío del mueble y por vía
              WhatsApp nos confirma la dirección a la que debemos enviarlo. El tiempo de
              envío es dependiendo de tu ubicación, pero generalmente es de 3 a 5 días
              hábiles dentro de Colombia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}