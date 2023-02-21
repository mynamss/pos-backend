const express = require("express");
const router = express();

const { getAllKategori } = require("../controllers/kategoriController");

router.get("/", getAllKategori);

module.exports = router;
