const express = require("express");
const router = express();

const { getAllUser } = require("../controllers/userController");

router.get("/user", getAllUser);

module.exports = router;
