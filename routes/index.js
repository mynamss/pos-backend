const express = require("express");
const router = express();
// const key = require("random-key");

const customersRouter = require("./customers.router");
const employeesRouter = require("./employees.router");
const outletsRouter = require("./outlets.router");
const rolesRouter = require("./roles.router");
const shiftsRouter = require("./shifts.router");
const leaveRouter = require("./leave.router");
const categoriesRouter = require("./categories.router");
const pointsRouter = require("./points.router");
const productsRouter = require("./products.router");
const suppliersRouter = require("./suppliers.router");
const salesRouter = require("./sales.router");
// const purchasesRouter = require("./purchases.router");

// homepage
router.get("/", (req, res) => {
  res.send("Welcome, This is Point Of Sales!");
});
// router.get('/key', (req, res) => {
//   res.send(key.generate(32));
// });

// user
router.use("/users", customersRouter);
router.use("/employees", employeesRouter);

// menu
router.use("/outlets", outletsRouter);
router.use("/suppliers", suppliersRouter);

router.use("/roles", rolesRouter);  // done RN
router.use("/leave", leaveRouter);
router.use("/shifts", shiftsRouter);
router.use("/categories", categoriesRouter);
router.use("/points", pointsRouter);
router.use("/products", productsRouter);
router.use("/sales", salesRouter);
// router.use("/purchases", purchasesRouter);

module.exports = router;
