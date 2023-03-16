const models = require("../../models");
const { Employee } = models;

module.exports = {
  // Table Employees
  getAllEmployee: async (req, res) => {
    try {
      let allEmployee = await Employee.findAll();
      // Checking
      if (allEmployee.length == 0) {
        response(404, null, "Employee Not Found", res);
      } else {
        response(200, allEmployee, "Get All Employee Success", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },
  getEmployeeByID: async (req, res) => {
    try {
    } catch (error) {}
  },
  addEmployee: async (req, res) => {
    try {
    } catch (error) {}
  },

  updateEmployee: async (req, res) => {
    try {
    } catch (error) {}
  },

  deleteEmployee: async (req, res) => {
    try {
    } catch (error) {}
  },

  // Employees Address
};
