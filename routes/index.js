const express = require("express");
const router = express();
const key = require("random-key");

const { register, login } = require("../controllers/authController");
const userRouter = require("./userRouter");
const outletRouter = require("./outletsRouter");

// homepage
router.get("/", (req, res) => {
  res.send("Welcome, Point Of Sales!");
});
// router.get('/key', (req, res) => {
//   res.send(key.generate(32));
// });

// auth
router.post("/register", register);
router.post("/login", login);

router.use("/user", userRouter);
router.use("/outlet", outletRouter);

module.exports = router;
