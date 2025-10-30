import { Router } from "express";
import { Users } from "../entity/clients.entity.js";
import { body, param } from "express-validator";
import donenv from "dotenv";

donenv.configDotenv();

const router = Router();

router.post(
    "/",
    [
      body("identificacion").isNumeric().isInt({ min:4, max:50}),
      body("primer_Nombre").isString().exists(),
      body("segundo_Nombre").isString().exists(),
      body("primer_Apellido").isString().exists(),
      body("segundo_Apellido").isString().exists(),
      body("correo").isString().isEmail().exists(),
      body("contrasena").isString().exists(),
      body("rol").optional().isIn(["admin", "cliente"]),
    ],
    async (req, res) => {

        const count = await Users.count();
        const userCreate = req.body;
        const roleToAssign = count === 0 ? "admin" : userCreate.rol || "usuario";    
        const CreatedUser = await Users.create({ ...userCreate, rol: roleToAssign,});

        return res.json({
            data: CreatedUser,
        });
    }
);

export default router;