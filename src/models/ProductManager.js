import fs from "fs";
const path = "./src/data/products.json";

class ProductManager {
  constructor() {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify([]));
    }
  }

  async getProducts(limit) {
    const data = JSON.parse(await fs.promises.readFile(path, "utf-8"));
    return limit ? data.slice(0, limit) : data;
  }

  async getProductById(id) {
    const data = JSON.parse(await fs.promises.readFile(path, "utf-8"));
    return data.find((p) => p.id === id);
  }

  async addProduct(product) {
    const data = JSON.parse(await fs.promises.readFile(path, "utf-8"));
    const id = data.length ? Math.max(...data.map(p => p.id)) + 1 : 1;
    const newProduct = { id, ...product, status: product.status ?? true };
    data.push(newProduct);
    await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    let data = JSON.parse(await fs.promises.readFile(path, "utf-8"));
    const index = data.findIndex((p) => p.id === id);
    if (index === -1) return null;
    data[index] = { ...data[index], ...updatedFields };
    await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
    return data[index];
  }

  async deleteProduct(id) {
    let data = JSON.parse(await fs.promises.readFile(path, "utf-8"));
    const newData = data.filter((p) => p.id !== id);
    if (data.length === newData.length) return null;
    await fs.promises.writeFile(path, JSON.stringify(newData, null, 2));
    return true;
  }
}

export default new ProductManager();
