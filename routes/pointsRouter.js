const express = require("express");
const router = express();

const { getAllPoints, getPointsByID, addPoints, updatePoints, deletePoints } = require("../controllers/customers/pointsController");

router.get("/", getAllPoints);
router.get("/:id", getPointsByID);
router.post("/add", addPoints);
router.put("/", updatePoints);
router.delete("/", deletePoints);

module.exports = router;
