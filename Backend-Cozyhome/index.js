import express from "express";
import { configDb } from "./config/db.js";
import http from "http";
import { Users } from "./entity/clients.entity.js";
import CreateClients from "./routes/clients.router.js"
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);
app.use(express.json()); 
app.use(cors());
configDb();
Users.sync();
app.use("/Register",CreateClients)

server.listen(PORT, () => {
    console.log("Listening on port 8000");
});

