const express = require("express");
const router = express();

const { getAllOutlet, getOutletByID, addOutlet, deleteOutlet, updateOutlet } = require("../controllers/outlets/outletsController");

router.get("/all", getAllOutlet);
router.get("/:id", getOutletByID);
router.post("/:id", addOutlet);
router.put("/:id", updateOutlet);
router.delete("/:id", deleteOutlet);

module.exports = router;
