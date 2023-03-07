const express = require("express");
const router = express();
const key = require("random-key");

const customersRouter = require("./customersRouter");
const employeesRouter = require("./employeesRouter");
const outletRouter = require("./outletsRouter");

// homepage
router.get("/", (req, res) => {
  // res.set("Content-Type", "application/json");
  res.send("Welcome, Point Of Sales!");
});
// router.get('/key', (req, res) => {
//   res.send(key.generate(32));
// });

// user
router.use("/member", customersRouter);
router.use("/employee", employeesRouter);

// menu
router.use("/outlet", outletRouter);

module.exports = router;
