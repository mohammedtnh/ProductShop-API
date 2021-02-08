const express = require("express");
const db = require("./db/models");
const { Product } = require("./db/models");

const PORT = 8000;
const app = express();

app.use(express.json());

//List all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Create a product
app.post("/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get details
app.get("/products/:productId", async (req, res) => {
  try {
    const foundProduct = await Product.findByPk(req.params.productId);
    if (foundProduct) {
      res.json(foundProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update Product
app.put("/products/:productId", async (req, res) => {
  try {
    const foundProduct = await Product.findByPk(req.params.productId);
    if (foundProduct) {
      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete Product
app.delete("/products/:productId", async (req, res) => {
  try {
    const foundProduct = await Product.findByPk(req.params.productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Sync DB and listen to port
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
  });
};

run();
