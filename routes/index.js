const express = require("express");
const router = express();

const adminRouter = require("./adminRouter");
const kategoriRouter = require("./kategoriRouter");
const produkRouter = require('./produkRouter');
const pembeliRouter = require('./pembeliRouter');

router.get("/", (req, res) => {
  res.send("Hello to Express");
});

router.use("/admin", adminRouter);
router.use("/kategori", kategoriRouter);
router.use("/produk", produkRouter);
router.use("/pembeli", pembeliRouter);

module.exports = router;
