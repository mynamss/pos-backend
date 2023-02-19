const express = require("express");
const router = express();

const userRouter = require("./userRouter");

router.get("/", (req, res) => {
  res.send("Hello to Express");
});

router.get("/user", userRouter);

module.exports = router;
