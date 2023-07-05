const express = require("express");
const router = express();

const { getAllPoints, getPointsByID, addPoints, updatePoints, deletePoints, getAllEarnedPoints } = require("../controllers/customers/points.controller");

// All Point
router.get("/", getAllPoints);
router.get("/:id", getPointsByID);
router.post("/add", addPoints);
router.put("/", updatePoints);
router.delete("/", deletePoints);

// Earned Point from sale
router.get("/", getAllEarnedPoints);
router.get("/:id", getPointsByID);
router.post("/add", addPoints);
router.put("/", updatePoints);
router.delete("/", deletePoints);

module.exports = router;
