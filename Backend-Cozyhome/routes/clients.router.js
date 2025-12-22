import { Router } from "express";
import { Users } from "../entity/clients.entity.js";
import { login } from "../controllers/auth.controller.login.js";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

const router = Router();

// ---------------------- REGISTER -------------------------
router.post(
  "/Register",
  [
    body("identificacion").isNumeric().withMessage("Identificación inválida"),
    body("primer_Nombre").isString().exists(),
    body("segundo_Nombre").optional().isString(),
    body("primer_Apellido").isString().exists(),
    body("segundo_Apellido").isString().exists(),
    body("correo").isEmail().withMessage("Correo inválido"),
    body("contrasena").isString().exists(),
    body("rol").optional().isIn(["admin", "usuario"]),
  ],
  async (req, res) => {
    try {
      const userCreate = req.body;

      // ------------------------------
      // ENCRIPTAR CONTRASEÑA AQUÍ
      // ------------------------------
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userCreate.contrasena, salt);

      // Reemplazar la contraseña original por la encriptada
      userCreate.contrasena = hashedPassword;

      // ------------------------------
      // ASIGNAR EL ROL AUTOMÁTICO
      // ------------------------------
      const count = await Users.count();
      const roleToAssign =
        count === 0 ? "admin" : userCreate.rol || "usuario";

      // ------------------------------
      // CREAR USUARIO
      // ------------------------------
      const CreatedUser = await Users.create({
        ...userCreate,
        rol: roleToAssign,
      });

      return res.json({
        message: "Usuario registrado correctamente",
        data: CreatedUser,
      });

    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return res.status(500).json({
        error: "No se pudo registrar el usuario",
        details: error.message,
      });
    }
  }
);


// ---------------------- LOGIN -------------------------
router.post("/login", login);

export default router;
