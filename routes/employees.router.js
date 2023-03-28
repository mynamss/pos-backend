const express = require("express");
const router = express();
const middleWare = require("../middlewares");
const auth = require("../controllers/auth.controller");

const employees = require("../controllers/employees/employees.controller");
const address = require("../controllers/address.controller");

// auth
router.post("/register", auth.registerEmployee);
router.post("/login", auth.loginEmployee);

// employees data
router
  .route("/")
  // get all employee
  .get(employees.getAllEmployee)
  // add new employee
  .post(employees.addEmployee);

router
  .route("/with/:id")
  // get employee by id
  .get(employees.getEmployeeByID)
  // update existing employee
  .put(employees.updateEmployee)
  // delete existing employee
  .delete(employees.deleteEmployee);

// employees address
router
  .route("/address")
  // get all supp address
  .get(address.getAllEmpAddr);

router
  .route("/address/:id")
  // get address by id
  .get(address.getEmpAddrByID)
  // update existing address
  .put(address.updateEmpAddr)
  // delete existing address
  .delete(address.deleteEmpAddr);

module.exports = router;
