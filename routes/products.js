const express = require("express");
const passport = require("passport");

const {
  productList,
  productDetails,
  productUpdate,
  productDelete,
  fetchProduct,
} = require("../controllers/productControllers");
const router = express.Router();
const upload = require("../middleware/multer");

router.param("productId", async (req, res, next, productId) => {
  const foundProduct = await fetchProduct(productId, next);
  if (foundProduct) {
    req.product = foundProduct;
    next();
  } else {
    const error = new Error("Product Not Found");
    error.status = 404;
    next(error);
  }
});

//List all products
router.get("/", productList);

//Get details
router.get("/:productId", productDetails);

//Update Product
router.put(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productUpdate
);

//Delete Product
router.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  productDelete
);

module.exports = router;
