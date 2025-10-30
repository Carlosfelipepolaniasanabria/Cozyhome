import { Users } from "../entity/clients.entity";
import bcrypt from "bcryptjs";


export const login = async (req, res) => {
    try {
    const {identificacion, correo, contrasena} = req.body;
    const user = await Users.findOne({ where: { correo, identificacion } });

    if (!user)
      return res.status(400).json({ message: ["El usuario no existe"] });

        const isMatch = await bcrypt.compare(contrasena, userFound.contrasena);
        if(!isMatch)
            return res.status(400).json({message: ["the passsword is incorrect"]});

        res.json({
            id: Users.identificacion,
            correo: Users.correo,
            mensaje: "inicio de sención exitoso"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}