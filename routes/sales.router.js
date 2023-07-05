const express = require("express");
const router = express();

const { getAllSale, getSaleByID, addSale, updateSale, deleteSale } = require("../controllers/sales/sales.controller");
const { getAllDetails, getDetailByID, addDetails } = require("../controllers/sales/detailsItem.controller");

router.get("/", getAllSale);
router.get("/search", getSaleByID);
router.post("/add", addSale);
router.put("/", updateSale);
router.delete("/", deleteSale);

// Detail Items
// router.get("/details/items", getAllDetails)
router.post("/details/items/add", addDetails);

module.exports = router;
