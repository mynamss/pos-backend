const models = require("../../models");
const { Supplier, suppliersAddress } = models;
const {response, errResponse} = require("../../response");

module.exports = {
  getAllSupplier: async (req, res) => {
    try {
      let allSupplier = await Supplier.findAll();
      // Checking
      if (allSupplier.length == 0) {
        response(404, null, "Suppliers Not Found", res);
      } else {
        response(200, allSupplier, "Get All Suppliers Success", res);
      }
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },
  getSupplierByID: async (req, res) => {
    try {
      res.json({
        "msg": "get supp by id"
      })
    } catch (error) {}
  },
  addSupplier: async (req, res) => {
    try {
      let newSupplier = req.body;

      let isSupplierExist = await Supplier.findOne({
        where: {
          email: newSupplier.email,
        },
      });
      // Check and insert to DB
      if (isSupplierExist == null) {
        // Insert to suppliers
        let result = await Supplier.create(newSupplier);

        // Insert to suppliers_address
        console.log("Sampe sini");
        let resultAddress = await suppliersAddress.create({
          supplier_id: 1,
          street_name: newSupplier.street_name,
          district: newSupplier.district,
          city: newSupplier.city,
          province: newSupplier.province,
          country: newSupplier.country,
          postal_code: newSupplier.postal_code,
        });
        console.log("isi: ", resultAddress);
        response(201, resultAddress, "Added Supplier Success", res);
      } else {
        response(403, isSupplierExist, "Supplier is exist", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },

  updateSupplier: async (req, res) => {
    try {
    } catch (error) {}
  },

  deleteSupplier: async (req, res) => {
    try {
      // let { category_code } = req.body;
      // Search in DB
      // let dataSupplier = await Supplier.findOne({
      //   where: {
      //     email: "pttangituru@gmail.com" ,
      //   },
      // });
      // if (dataSupplier == null) {
      //   response(404, null, "Data Not Found", res);
      // } else {
      //   Supplier.destroy({
      //     where: {
      //       id: 3,
      //     },
      //   });
      //   response(200, "", "Supplier Deleted", res);
      // }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },
};
