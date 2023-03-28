const models = require("../../models");
const { Sales, Employee, Product, detailsItems } = models;
const { response, errResponse } = require("../../response");
const { addSale } = require("./sales.controller");
const { getProductByID } = require("../products/products.controller");

module.exports = {
  getAllDetails: async (req, res) => {
    try {
    } catch (error) {}
  },
  getDetailByID: async (req, res) => {
    try {
    } catch (error) {}
  },
  addDetails: async (req, res) => {
    // scan barcode = req.body
    // getProduct by barcode
    // checking isNull
    // insert to DB
    try {
      let { barcode_id } = req.body;
      // console.log("add Details", barcode_id);
      // get product by barcode_id
      const product = await Product.findOne({
        where: {
          barcode_id: barcode_id,
        },
      });
      // console.log("product: ", product);
      // checking
      if (product) {
        // create new sale
        const newSale = await addSale();
        console.log("ISI", newSale);
        // insert to table
        // const addDetail = await detailsItems.create({
        //   product_id: product.id,
        //   sale_id: newSale.id,
        //   quantity: quantity,
        //   created_by: ({ id } = await Employee.findOne({
        //     where: {
        //       token: req.headers.authorization.split(" ")[1],
        //     },
        //   })),
        //   updated_by: ({ id } = await Employee.findOne({
        //     where: {
        //       token: req.headers.authorization.split(" ")[1],
        //     },
        //   })),
        // });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
