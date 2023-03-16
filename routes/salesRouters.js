const express = require("express");
const router = express();

const { getAllSale, getSaleByID, addSale, updateSale, deleteSale } = require("../controllers/sales/SalesController");

router.get("/", getAllSale);
router.get("/search", getSaleByID);
router.post("/add", addSale);
router.put("/", updateSale);
router.delete("/", deleteSale);

module.exports = router;
