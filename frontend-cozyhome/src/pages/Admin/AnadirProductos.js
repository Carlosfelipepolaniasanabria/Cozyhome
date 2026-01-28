import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagen: null
  });

  const navigate = useNavigate();
  const API_URL = "http://localhost:8000/api/products";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const cargarProductos = async () => {
    const res = await axios.get(API_URL);
    setProductos(res.data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagen = (e) => {
    setForm({ ...form, imagen: e.target.files[0] });
  };

  const agregarProducto = async (e) => {
    e.preventDefault();

    // 🔥 FormData obligatorio para archivos
    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("descripcion", form.descripcion);
    formData.append("precio", form.precio);
    formData.append("categoria", form.categoria);
    formData.append("imagen", form.imagen);

    try {
      await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      });

      cargarProductos();

      setForm({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        imagen: null
      });

    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Error al crear el producto");
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;

    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    cargarProductos();
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Panel Administrador</h2>
        <button className="btn btn-outline-danger" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      {/* FORMULARIO */}
      <form onSubmit={agregarProducto} className="mb-4">

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
          name="imagen"
          accept="image/*"
          onChange={handleImagen}
          required
        />

        {/* PREVIEW */}
        {form.imagen && (
          <img
            src={URL.createObjectURL(form.imagen)}
            alt="preview"
            style={{ width: "150px", marginBottom: "10px" }}
          />
        )}

        <button className="btn btn-success w-100">
          Agregar producto
        </button>
      </form>

      {/* LISTA */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>
                <img
                  src={`http://localhost:8000${p.imagen}`}
                  alt={p.nombre}
                  width="80"
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default AdminProductos;


