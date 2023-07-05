const express = require("express");
const router = express();
const auth = require("../controllers/auth.controller");

// middlewares
const { validateRegister, validateLogin, runValidation, validateUpdate } = require("../middlewares/validateType/validateEmployee");
const { verifyToken } = require("../middlewares");

const employees = require("../controllers/employees/employees.controller");
const address = require("../controllers/address.controller");

// auth:
// register employee
router.get("/register", (req, res) => {
  res.render("./pages/auth/register-employee.ejs");
});
router.post("/register", [validateRegister, runValidation], auth.registerEmployee);

// login employee
router.get("/login", (req, res) => {
  res.render("./pages/auth/login-employee.ejs");
});
router.post("/login", [validateLogin, runValidation], auth.loginEmployee);

// employees data
router
  .route("/")
  // get all employee = hanya manager
  .get(verifyToken, employees.getAllEmployee);

router
  .route("/profile/:id")
  // get employee by id
  .get(verifyToken, employees.getEmployeeByID)
  // update existing employee
  .put(verifyToken, [validateUpdate, runValidation], employees.updateEmployee)
  // delete existing employee
  .delete(verifyToken, employees.deleteEmployee);

// employees address
router
  .route("/address")
  // get all supp address
  .get(verifyToken, address.getAllEmpAddr);

// router
  // .route("/address/:id")
  // get address by id
  // .get(verifyToken, address.getEmpAddrByID)
  // update existing address
  // .put(verifyToken, [validateUpdate, runValidation], address.updateEmpAddr)
  // delete existing address
  // .delete(verifyToken,address.deleteEmpAddr);

module.exports = router;
