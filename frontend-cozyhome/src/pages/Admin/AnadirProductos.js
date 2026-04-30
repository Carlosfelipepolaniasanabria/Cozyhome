import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./admin.css";

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagen: null
  });

  const [editandoId, setEditandoId] = useState(null);
  const [preview, setPreview] = useState(null);

  const API_URL = "https://backend-cozyhome.onrender.com/api";
  const token = localStorage.getItem("token");

  const cargarProductos = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProductos(res.data);
    } catch (error) {
      Swal.fire("Error", "Error cargando productos", "error");
    }
  };

  const cargarPedidos = async () => {
    try {
      const res = await axios.get(`${API_URL}/sales`);
      setPedidos(res.data);
    } catch (error) {
      Swal.fire("Error", "Error cargando pedidos", "error");
    }
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
      imagen: null
    });
    setEditandoId(null);
    setPreview(null);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImagen = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, imagen: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

const agregarOActualizarProducto = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("nombre", form.nombre);
  formData.append("descripcion", form.descripcion);
  formData.append("precio", form.precio);
  formData.append("categoria", form.categoria);

  if (form.imagen) {
    formData.append("imagen", form.imagen);
  }

  try {
    if (editandoId) {
      await axios.put(`${API_URL}/products/${editandoId}`, formData, {
      });

      Swal.fire("Éxito", "Producto actualizado correctamente", "success");
    } else {
      await axios.post(`${API_URL}/products`, formData, {
      });

      Swal.fire("Éxito", "Producto agregado correctamente", "success");
    }

    resetForm();
    cargarProductos();
  } catch (error) {
    console.error("ERROR COMPLETO:", error);
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);

    Swal.fire(
      "Error",
      error.response?.data?.message ||
        error.response?.data?.error ||
        "No se pudo guardar el producto",
      "error"
    );
  }
};

  const editarProducto = (producto) => {
    setEditandoId(producto.id);
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      imagen: null
    });
    setPreview(producto.imagen || null);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const eliminarProducto = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "El producto se ocultará del catálogo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c0564b",
      cancelButtonColor: "#6a9b74",
      confirmButtonText: "Sí, eliminar"
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/products/${id}`,);

      Swal.fire("Eliminado", "Producto eliminado correctamente", "success");
      cargarProductos();
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el producto", "error");
    }
  };

  const cambiarEstado = async (id_sale, estado) => {
    try {
      await axios.put(`${API_URL}/sales/${id_sale}`, { estado });
      Swal.fire("Actualizado", "El estado del pedido fue actualizado", "success");
      cargarPedidos();
    } catch (error) {
      Swal.fire("Error", "No se pudo cambiar el estado", "error");
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarPedidos();
  }, []);

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <div>
            <p className="admin-kicker">Cozy Home</p>
            <h2>Panel de Administración</h2>
            <p className="admin-subtitle">
              Gestiona productos y pedidos de forma visual y organizada.
            </p>
          </div>
        </div>

        <div className="admin-grid">
          <div className="admin-form-card">
            <h4>{editandoId ? "Editar producto" : "Agregar producto"}</h4>

            <form onSubmit={agregarOActualizarProducto}>
              <input
                className="form-control mb-2"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />

              <textarea
                className="form-control mb-2"
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                type="number"
                name="precio"
                placeholder="Precio"
                value={form.precio}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                name="categoria"
                placeholder="Categoría"
                value={form.categoria}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                type="file"
                onChange={handleImagen}
                accept="image/*"
                required={!editandoId}
              />

              {preview && (
                <div className="preview-box">
                  <img src={preview} alt="preview" className="preview-image" />
                </div>
              )}

              <div className="admin-form-actions">
                <button className="btn btn-success w-100" type="submit">
                  {editandoId ? "Actualizar producto" : "Agregar producto"}
                </button>

                {editandoId && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={resetForm}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-summary-card">
            <h4>Resumen rápido</h4>

            <div className="summary-stats">
              <div className="stat-box">
                <span>{productos.length}</span>
                <p>Productos activos</p>
              </div>

              <div className="stat-box">
                <span>{pedidos.length}</span>
                <p>Pedidos registrados</p>
              </div>

              <div className="stat-box">
                <span>
                  {
                    pedidos.filter((p) => p.estado === "pendiente").length
                  }
                </span>
                <p>Pedidos pendientes</p>
              </div>
            </div>
          </div>
        </div>

        <section className="section-block">
          <div className="section-head">
            <h4>Productos</h4>
          </div>

          <div className="products-cards">
            {productos.map((p) => (
              <div className="product-card" key={p.id}>
                <img src={p.imagen} alt={p.nombre} className="product-card-image" />

                <div className="product-card-body">
                  <div className="product-card-top">
                    <h5>{p.nombre}</h5>
                    <span className="product-tag">{p.categoria}</span>
                  </div>

                  <p className="product-description">{p.descripcion}</p>
                  <strong className="product-price">
                    ${Number(p.precio).toLocaleString("es-CO")}
                  </strong>

                  <div className="product-card-actions">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => editarProducto(p)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarProducto(p.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-head">
            <h4>Pedidos</h4>
          </div>

          <div className="table-responsive">
            <table className="table admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Productos</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pedidos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No hay pedidos
                    </td>
                  </tr>
                ) : (
                  pedidos.map((p) => (
                    <tr key={p.id_sale}>
                      <td>#{p.id_sale}</td>
                      <td>{p.identificacion_usuario}</td>
                      <td>${Number(p.total).toLocaleString("es-CO")}</td>
                      <td>
                        <span
                          className={`estado-badge ${
                            p.estado === "pendiente"
                              ? "estado-pendiente"
                              : "estado-completada"
                          }`}
                        >
                          {p.estado}
                        </span>
                      </td>
                      <td>
                        <div className="pedido-detalles">
                          {p.detalles?.map((d) => (
                            <div key={d.id_detail}>
                              {d.nombre_producto} x {d.cantidad}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <button
                          className={`btn btn-sm ${
                            p.estado === "pendiente"
                              ? "btn-success"
                              : "btn-warning"
                          }`}
                          onClick={() =>
                            cambiarEstado(
                              p.id_sale,
                              p.estado === "pendiente"
                                ? "completada"
                                : "pendiente"
                            )
                          }
                        >
                          Cambiar estado
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}