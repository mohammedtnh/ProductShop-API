const express = require("express");
const {
  shopList,
  shopCreate,
  fetchShop,
  productCreate,
} = require("../controllers/shopControllers");
const router = express.Router();
const upload = require("../middleware/multer");

router.param("shopId", async (req, res, next, shopId) => {
  const foundShop = await fetchShop(shopId, next);
  if (foundShop) {
    req.shop = foundShop;
    next();
  } else {
    const error = new Error("Shop Not Found");
    error.status = 404;
    next(error);
  }
});

//List all shops
router.get("/", shopList);

//Create a shop
router.post("/", upload.single("image"), shopCreate);

//Create a product
router.post("/:shopId/products", upload.single("image"), productCreate);

module.exports = router;
