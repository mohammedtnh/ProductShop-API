const express = require("express");
const {
  productList,
  productCreate,
  productDetails,
  productUpdate,
  productDelete,
  fetchProduct,
} = require("../controllers/productControllers");

const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const foundProduct = await fetchProduct(productId, next);
  if (foundProduct) {
    req.product = foundProduct;
    next();
  } else {
    next({
      status: 404,
      message: "Product not found",
    });
  }
});

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