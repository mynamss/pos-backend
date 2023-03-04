const models = require("../../models");
const { suppliers } = models;

module.exports = {
  getAllSupplier: async (req, res) => {
    try {
      const allSupplier = await suppliers.findAll();
      res.status(200).json({
        msg: "Success Get All User",
        data: allSupplier,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getSupplierByID: async (req, res) => {
    try {
    } catch (error) {}
  },
  addSupplier: async (req, res) => {
    try {
    } catch (error) {}
  },

  updateSupplier: async (req, res) => {
    try {
    } catch (error) {}
  },

  deleteSupplier: async (req, res) => {
    try {
    } catch (error) {}
  },
};
