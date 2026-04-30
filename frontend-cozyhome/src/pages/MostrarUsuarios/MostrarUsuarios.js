import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./MostrarUsuarios.css";

export default function MostrarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const API_URL = "https://backend-cozyhome.onrender.com/api/clients";
  const token = localStorage.getItem("token");

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      const res = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios(res.data);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const cambiarRol = async (identificacion, nuevoRol) => {
    const confirm = await Swal.fire({
      title: "¿Cambiar rol?",
      text: `¿Deseas cambiar el rol a ${nuevoRol}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6a9b74",
      cancelButtonColor: "#c0564b",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.put(
        `${API_URL}/users/${identificacion}/role`,
        { rol: nuevoRol },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire(
        "Éxito",
        "Rol actualizado correctamente",
        "success"
      );
      cargarUsuarios();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No se pudo cambiar el rol",
        "error"
      );
    }
  };

  const filtrarUsuarios = () => {
    let resultado = usuarios;

    if (filtro !== "todos") {
      resultado = resultado.filter((u) => u.rol === filtro);
    }

    if (busqueda.trim()) {
      const busquedaLower = busqueda.toLowerCase();
      resultado = resultado.filter(
        (u) =>
          u.primer_Nombre.toLowerCase().includes(busquedaLower) ||
          u.primer_Apellido.toLowerCase().includes(busquedaLower) ||
          u.correo.toLowerCase().includes(busquedaLower) ||
          u.identificacion.toString().includes(busquedaLower)
      );
    }

    return resultado;
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const usuariosFiltrados = filtrarUsuarios();

  return (
    <div className="mostrar-usuarios-container">
      <div className="container">
        <div className="usuarios-header">
          <div>
            <p className="usuarios-kicker">Cozy Home</p>
            <h2>Gestión de Usuarios</h2>
            <p className="usuarios-subtitle">
              Administra los usuarios registrados y asigna roles.
            </p>
          </div>
        </div>

        <div className="usuarios-controls">
          <div className="control-busqueda">
            <input
              type="text"
              placeholder="Buscar por nombre, correo o identificación..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-busqueda"
            />
          </div>

          <div className="control-filtro">
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="select-filtro"
            >
              <option value="todos">Todos los roles</option>
              <option value="usuario">Usuarios</option>
              <option value="admin">Administradores</option>
            </select>
          </div>
        </div>

        <div className="usuarios-stats">
          <div className="stat-item">
            <span className="stat-numero">{usuarios.length}</span>
            <span className="stat-label">Total de usuarios</span>
          </div>
          <div className="stat-item">
            <span className="stat-numero">
              {usuarios.filter((u) => u.rol === "admin").length}
            </span>
            <span className="stat-label">Administradores</span>
          </div>
          <div className="stat-item">
            <span className="stat-numero">
              {usuarios.filter((u) => u.rol === "usuario").length}
            </span>
            <span className="stat-label">Usuarios regulares</span>
          </div>
        </div>

        {cargando ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando usuarios...</p>
          </div>
        ) : usuariosFiltrados.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron usuarios</p>
          </div>
        ) : (
          <div className="usuarios-table-wrapper">
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Identificación</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol actual</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.identificacion} className="usuario-row">
                    <td className="cell-id">#{usuario.identificacion}</td>
                    <td className="cell-nombre">
                      <span className="nombre-usuario">
                        {usuario.primer_Nombre} {usuario.primer_Apellido}
                      </span>
                      <span className="nombre-completo">
                        {usuario.segundo_Nombre} {usuario.segundo_Apellido}
                      </span>
                    </td>
                    <td className="cell-correo">{usuario.correo}</td>
                    <td className="cell-rol">
                      <span
                        className={`rol-badge ${
                          usuario.rol === "admin"
                            ? "rol-admin"
                            : "rol-usuario"
                        }`}
                      >
                        {usuario.rol === "admin" ? "👑 Admin" : "👤 Usuario"}
                      </span>
                    </td>
                    <td className="cell-acciones">
                      <button
                        className={`btn-rol ${
                          usuario.rol === "admin"
                            ? "btn-quitar-admin"
                            : "btn-hacer-admin"
                        }`}
                        onClick={() =>
                          cambiarRol(
                            usuario.identificacion,
                            usuario.rol === "admin" ? "usuario" : "admin"
                          )
                        }
                      >
                        {usuario.rol === "admin"
                          ? "Quitar admin"
                          : "Hacer admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="usuarios-footer">
          <p className="footer-info">
            Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios
          </p>
        </div>
      </div>
    </div>
  );
}