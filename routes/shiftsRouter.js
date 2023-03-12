const express = require("express");
const router = express();

const { getAllShift, addShift, updateShift, deleteShift, getShiftByID } = require("../controllers/employees/shiftsController");

router.get("/", getAllShift);
router.get("/:id", getShiftByID);
router.post("/add", addShift);
router.put("/", updateShift);
router.delete("/", deleteShift);

module.exports = router;
