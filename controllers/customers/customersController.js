const models = require("../../models");
const { Customer } = models;
const response = require("../../response");

module.exports = {
  getAllCustomer: async (req, res) => {
    try {
      let allCust = await Customer.findAll();
      console.log("allCust");

      if (allCust.length == 0) {
        response(404, null, "Customer Not Found", res);
      } else {
        response(200, allCust, "Get All Data Success", res);
      }
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },
  getCustomerByID: async (req, res) => {
    try {
      let { cust_code } = req.body;
      
    } catch (error) {}
  },
  addCustomer: async (req, res) => {
    try {
    } catch (error) {}
  },

  updateCustomer: async (req, res) => {
    try {
    } catch (error) {}
  },

  deleteCustomer: async (req, res) => {
    try {
    } catch (error) {}
  },

  // Customer Address
};
