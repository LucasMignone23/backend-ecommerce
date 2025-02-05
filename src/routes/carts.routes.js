import { Router } from "express";
import CartManager from "../models/CartManager.js";
import ProductManager from "../models/ProductManager.js"; // Para verificar productos

const router = Router();

// Crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const newCart = await CartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

// Obtener productos de un carrito por ID
router.get("/:cid", async (req, res) => {
  try {
    const cartId = Number(req.params.cid);
    const cart = await CartManager.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart.products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

// Agregar un producto a un carrito específico
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);

    // Verificar si el producto existe antes de agregarlo al carrito
    const product = await ProductManager.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const updatedCart = await CartManager.addProductToCart(cartId, productId);

    if (!updatedCart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
});

export default router;
