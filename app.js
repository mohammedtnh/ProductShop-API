const express = require("express");
const slugify = require("slugify");

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
    res.json(foundProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
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

app.post("/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id = data[data.length - 1].id + 1;
  newProduct.slug = slugify(newProduct.name, { lower: true });

  data.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
