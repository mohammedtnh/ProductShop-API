const express = require("express");
const slugify = require("slugify");
const PORT = 8000;
let data = require("./data");

const app = express();

app.use(express.json());

app.get("/products/", (req, res) => {
  res.json(data);
});

app.get("/products/:productId", (req, res) => {
  const foundProduct = data.find(
    (product) => product.id === +req.params.productId
  );
  if (foundProduct) {
    res.status(200).json(foundProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/products", (req, res) => {
  const newProduct = {
    id: data[data.length - 1].id + 1,
    slug: slugify(newProduct.name, { lower: true }),
    ...req.body,
  };

  data.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete("/products/:productId", (req, res) => {
  const foundProduct = data.find(
    (product) => product.id === +req.params.productId
  );
  if (foundProduct) {
    data = data.filter((product) => product.id !== +req.params.productId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
