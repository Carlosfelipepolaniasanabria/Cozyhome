import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./cambiarcontrasena.css";

export default function CambiarContrasena() {
  const [correo, setCorreo] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!correo || !currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Debes completar todos los campos",
        confirmButtonColor: "#7b2ff7"
      });
      return;
    }

    if (newPassword.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña insegura",
        text: "La nueva contraseña debe tener mínimo 8 caracteres",
        confirmButtonColor: "#7b2ff7"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Las contraseñas no coinciden",
        confirmButtonColor: "#7b2ff7"
      });
      return;
    }

    try {
      const response = await fetch(
        "https://backend-cozyhome.onrender.com/api/clients/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correo,
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "No se pudo cambiar la contraseña",
          text: data.message || "Alguno de los datos es incorrecto",
          confirmButtonColor: "#7b2ff7"
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Cambio exitoso",
        text: "La contraseña fue actualizada correctamente",
        confirmButtonColor: "#7b2ff7"
      });

      navigate("/login");
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);

      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor",
        confirmButtonColor: "#7b2ff7"
      });
    }
  };

  return (
    <div className="cambiar-contrasena-page">
      <div className="cambiar-contrasena-container">
        <h2>Cambiar contraseña</h2>

        <form onSubmit={handleChangePassword}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label>Contraseña actual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <label>Nueva contraseña</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label>Confirmar nueva contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}