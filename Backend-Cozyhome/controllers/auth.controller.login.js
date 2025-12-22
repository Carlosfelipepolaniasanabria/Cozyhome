import { Users } from "../entity/clients.entity.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({
        message: "Correo y contraseña son obligatorios",
      });
    }

    // Buscar usuario por correo
    const user = await Users.findOne({ where: { correo } });

    if (!user) {
      return res.status(404).json({
        message: "Correo incorrecto",
      });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(contrasena, user.contrasena);

    if (!validPassword) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }

    // Crear token opcional
    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        correo: user.correo,
        rol: user.rol,
      },
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error en el login",
      error: error.message,
    });
  }
};
