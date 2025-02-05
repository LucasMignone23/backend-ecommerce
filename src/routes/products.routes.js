import { Router } from "express";
import ProductManager from "../models/ProductManager.js";

const router = Router();

// Obtener todos los productos con opción de límite
router.get("/", async (req, res) => {
  const limit = Number(req.query.limit) || null;
  const products = await ProductManager.getProducts(limit);
  res.json(products);
});

// Obtener un producto por ID
router.get("/:pid", async (req, res) => {
  const product = await ProductManager.getProductById(Number(req.params.pid));
  product ? res.json(product) : res.status(404).json({ error: "Producto no encontrado" });
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  const product = await ProductManager.addProduct(req.body);
  res.status(201).json(product);
});

// Actualizar un producto
router.put("/:pid", async (req, res) => {
  const updatedProduct = await ProductManager.updateProduct(Number(req.params.pid), req.body);
  updatedProduct ? res.json(updatedProduct) : res.status(404).json({ error: "Producto no encontrado" });
});

// Eliminar un producto
router.delete("/:pid", async (req, res) => {
  const deleted = await ProductManager.deleteProduct(Number(req.params.pid));
  deleted ? res.json({ message: "Producto eliminado" }) : res.status(404).json({ error: "Producto no encontrado" });
});

export default router;
