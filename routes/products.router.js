const express = require("express");
const router = express();

const { getAllProduct, getProductByID, addProduct, updateProduct, deleteProduct } = require("../controllers/products/products.controller");

// Product
router.get("/", getAllProduct);
router.get("/search", getProductByID);
router.post("/add", addProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

module.exports = router;
