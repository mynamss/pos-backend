const express = require("express");
const router = express();

const { verifyToken, allowedEmployee } = require('../middlewares');
const { registerEmployee, loginEmployee } = require('../controllers/authController');

const {
    getAllEmployee,
    getEmployeeByID,
    addEmployee,
    deleteEmployee,
    updateEmployee
} = require("../controllers/employees/employeesController");

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);

// Employees
router.get("/all", [verifyToken, allowedEmployee],getAllEmployee);
router.get("/:id", getEmployeeByID);
router.post("/:id", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
module.exports = router;
