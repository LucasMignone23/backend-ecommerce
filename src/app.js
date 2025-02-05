import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de E-commerce");
  });
  

export default app;
