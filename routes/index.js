const express = require("express");
const router = express();
// const key = require("random-key");

const customersRouter = require("./customersRouter");
const employeesRouter = require("./employeesRouter");
const outletRouter = require("./outletsRouter");
const rolesRouter = require("./rolesRouter");
const shiftsRouter = require("./shiftsRouter.js");
const leaveRouter = require('./leaveRouter');
const categoriesRouter = require('./categoriesRouter');
const pointsRouter = require('./pointsRouter');
const productsRouter = require('./productsRouter');

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
router.use("/employees", employeesRouter);

// menu
router.use("/outlets", outletRouter);
router.use("/roles", rolesRouter);
router.use("/shifts", shiftsRouter);
router.use("/leave", leaveRouter);
router.use("/categories", categoriesRouter)
router.use("/points", pointsRouter)
router.use("/customers", customersRouter)
router.use("/products", productsRouter)


module.exports = router;
