import { Sale } from "../entity/sale.entity.js";
import { Users } from "../entity/clients.entity.js";

// Controller para crear venta
export const createSale = async (req, res) => {
  try {
    console.log("💰 BODY RECIBIDO:", req.body);

    const { identificacion_usuario, cart } = req.body;

    // Validaciones
    if (!identificacion_usuario) {
      return res.status(400).json({ message: "Usuario no definido" });
    }

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Carrito vacío" });
    }

    // Verificar que el usuario existe
    const user = await Users.findOne({ where: { identificacion: identificacion_usuario } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no existe en la base de datos" });
    }

    // Calcular total
    const total = cart.reduce((sum, p) => sum + Number(p.precio), 0);

    // Crear venta
    const sale = await Sale.create({
      identificacion_usuario,
      total
    });

    console.log("✅ Venta creada:", sale.id_sale);

    res.status(201).json({
      message: "Venta registrada correctamente",
      id_sale: sale.id_sale
    });

  } catch (error) {
    console.error("❌ ERROR BACKEND:", error);
    res.status(500).json({ message: error.message });
  }
};





