import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Productos.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://backend-cozyhome.onrender.com/api/products")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const comprarProducto = (producto) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Acceso requerido",
        text: "Debes iniciar sesión para comprar",
        confirmButtonColor: "#7b2ff7"
      });
      navigate("/login");
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carritoActual.find((item) => item.id === producto.id);

    let nuevoCarrito;

    if (productoExistente) {
      nuevoCarrito = carritoActual.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }];
    }

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: "El producto ha sido agregado al carrito",
      confirmButtonColor: "#7b2ff7"
    });
  };

  useEffect(() => {
    if (document.getElementById("n8n-chat-loaded")) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.type = "module";
    script.id = "n8n-chat-loaded";
    script.innerHTML = `
      import { createChat } from "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js";

      createChat({
        webhookUrl: "https://hooks.singularity.cyou/webhook/b138fea5-c0c3-46bf-b2f4-35fad802bf79/chat",
        target: "#n8n-chat",
        mode: "window",
        loadPreviousSession: false,
        showWelcomeScreen: false,
        initialMessages: [
          "Hola, bienvenido a CozyHome!",
          "Soy el asistente virtual de CozyHome 🪑",
          "Por favor coloca tu nombre, correo y número de documento para poder ayudarte mejor"
        ],
        i18n: {
          en: {
            title: "CozyHome",
            subtitle: "Estamos aquí para ayudarte",
            getStarted: "Chatea con nosotros",
            inputPlaceholder: "Escribe tu mensaje..."
          }
        }
      });
    `;

    document.getElementById("n8n-chat")?.appendChild(script);

    return () => {
      script.remove();
      link.remove();

      const chat = document.getElementById("n8n-chat");
      if (chat) chat.innerHTML = "";
    };
  }, []);

  return (
    <div className="productos-layout">
      <div className="productos-col">
        <div className="productos-header">
          <h2 className="mb-4">Productos</h2>
          <p className="productos-subtitle">
            Descubre piezas pensadas para transformar tu espacio con estilo y calidez.
          </p>
        </div>

        <div className="row">
          {productos.map((p, index) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4 producto-item"
              key={p.id}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="card h-100 shadow-sm">
                <div className="card-image-wrapper">
                  <img
                    src={
                      p.imagen?.includes("cloudinary")
                        ? p.imagen
                        : "https://res.cloudinary.com/dv6bumv1s/image/upload/default.jpg"
                    }
                    alt={p.nombre}
                    className="card-img-top"
                  />
                </div>

                <div className="card-body">
                  <h5>{p.nombre}</h5>
                  <p>{p.descripcion}</p>
                  <strong>${Number(p.precio).toLocaleString("es-CO")}</strong>
                </div>

                <div className="card-footer d-flex gap-2">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => comprarProducto(p)}
                  >
                    Comprar
                  </button>

                  <button
                    className="btn btn-outline-secondary cart-button"
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

      <div className="chat-col">
        <div id="n8n-chat"></div>
      </div>
    </div>
  );
}