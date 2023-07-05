const express = require("express");
const router = express();

const { getAllCategory, getCategoryByID, addCategory, updateCategory, deleteCategory } = require("../controllers/products/categories.controller");

router.get("/", getAllCategory);
router.get("/search", getCategoryByID);
router.post("/", addCategory);
router.put('/', updateCategory)
router.delete("/", deleteCategory)

module.exports = router;
