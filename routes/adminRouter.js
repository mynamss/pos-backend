const express = require("express");
const router = express();

const { getAllAdmin } = require("../controllers/adminController");

router.get("/", getAllAdmin);

module.exports = router;
