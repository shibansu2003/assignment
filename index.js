const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const products = [
  { id: 1, name: "Bottle", price: 250 },
  { id: 2, name: "Bag", price: 500 },
  { id: 3, name: "Pen", price: 50 }
];
app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/cart", (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const totalPrice = product.price * quantity;
  res.json({ productId, quantity, totalPrice });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
