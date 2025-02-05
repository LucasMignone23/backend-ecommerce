import fs from "fs";
const path = "./src/data/carts.json";

class CartManager {
  constructor() {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify([]));
    }
  }

  async createCart() {
    const data = JSON.parse(await fs.promises.readFile(path, "utf-8"));
    const id = data.length ? Math.max(...data.map(c => c.id)) + 1 : 1;
    const newCart = { id, products: [] };
    data.push(newCart);
    await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const data = JSON.parse(await fs.promises.readFile(path, "utf-8"));
    return data.find((c) => c.id === id);
  }

  async addProductToCart(cartId, productId) {
    const data = JSON.parse(await fs.promises.readFile(path, "utf-8"));
    const cart = data.find((c) => c.id === cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find((p) => p.product === productId);
    existingProduct ? existingProduct.quantity++ : cart.products.push({ product: productId, quantity: 1 });

    await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
    return cart;
  }
}

export default new CartManager();
