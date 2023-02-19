const express = require("express");
const router = express();

const { getAllPembeli } = require("../controllers/pembeliController.js");

router.get("/", getAllPembeli);

module.exports = router;
