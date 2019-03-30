const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/products", productController.index);
router.get("/products/new", productController.new);
router.post("/products/create", productController.create);
router.get("/products/:id", productController.show);



module.exports = router;