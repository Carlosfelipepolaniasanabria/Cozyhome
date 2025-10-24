import express from "express";
import { configDb } from "./config/db.js";
import http from "http";

const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);
configDb();

server.listen(PORT, () => {
    console.log("Listening on port 8000");
});

