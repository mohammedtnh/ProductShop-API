const express = require("express");
const {
  productList,
  productCreate,
  productDetails,
  productUpdate,
  productDelete,
} = require("../controllers/productControllers");

const router = express.Router();

//List all products
router.get("/", productList);

//Create a product
router.post("/", productCreate);

//Get details
router.get("/:productId", productDetails);

//Update Product
router.put("/:productId", productUpdate);

//Delete Product
router.delete("/:productId", productDelete);

module.exports = router;
