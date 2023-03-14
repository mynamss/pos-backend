const express = require("express");
const router = express();

const {
    getAllOutlet,
    getOutletByID,
    addOutlet,
    deleteOutlet,
    updateOutlet
} = require("../controllers/outlets/outletsController");


router.get("/", getAllOutlet);
router.post("/add",addOutlet);
router.route("/:id")
    .get(getOutletByID)
    .put(updateOutlet)
    .delete(deleteOutlet);

module.exports = router;
