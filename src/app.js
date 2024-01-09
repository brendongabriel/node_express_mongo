import express from "express";
import conectDatabase from "./config/dbConnect.js";
import router from "./routes/index.js";

const connect = await conectDatabase();

connect.on("error", (error) => console.log(error));
connect.once("open", () => console.log("Conectado ao MongoDB"));

const app = express();
router(app);

export default app;