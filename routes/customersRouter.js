const express = require("express");
const router = express();

const {
    getAllCustomer, getCustomerByID, addCustomer, deleteCustomer, updateCustomer
} = require("../controllers/customers/customersController");
const {
    getAllEmployee, getEmployeeByID, addEmployee, deleteEmployee, updateEmployee
} = require("../controllers/employees/employeesController");

// Customers
router.get("/all", getAllCustomer);
router.get("/:id", getCustomerByID);
router.post("/:id", addCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

// Employees
router.get("/all", getAllEmployee);
router.get("/:id", getEmployeeByID);
router.post("/:id", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
module.exports = router;
