import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Users } from "./clients.entity.js";

export const Sale = sequelize.define("Sale", {
    id_sale: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    // 🔑 Llave foránea
    identificacion_usuario: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Users,
            key: "identificacion",
        },
    }
});

// RELACIÓN
Users.hasMany(Sale, {
    foreignKey: "identificacion_usuario"
});

Sale.belongsTo(Users, {
    foreignKey: "identificacion_usuario"
});

Sale.sync();
