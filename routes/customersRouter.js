const express = require("express");
const router = express();

const {registerCust, loginCust} = require('../controllers/authController');
const {verifyToken, allowedCust} = require('../middlewares');

const {
    getAllCustomer, getCustomerByID, addCustomer, deleteCustomer, updateCustomer
} = require("../controllers/customers/customersController");

// auth
router.post("/register", registerCust);
router.post("/login", loginCust);

// Customers
router.get("/",getAllCustomer);
router.get("/search", getCustomerByID);
router.post("/:id", addCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);


module.exports = router;
