const models = require("../../models");
const { Product } = models;
const response = require("../../response");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      let allProduct = await Product.findAll();
      // Checking
      if (allProduct.length == 0) {
        response(404, null, "Products Not Found", res);
      } else {
        response(200, allProduct, "Get All Products Success", res);
      }
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },
  getProductByID: async (req, res) => {
    try {
      let { productcode } = req.query;

      const oneProduct = await Product.findOne({
        where: {
          product_code: productcode,
        },
      });
      if (oneProduct.length == 0) {
        response(404, null, "Product not found", res);
      } else {
        response(200, oneProduct, "Get 1 Product Success", res);
      }
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },

  addProduct: async (req, res) => {
    // Buat kode barcode (length : 12)
    // IDcode = 899
    // barCodeID = IDcode + company_code + product_code +

    try {
      let newProduct = req.body;

      // check
      const isProductExist = await Product.findOne({
        where: {
          product_code: newProduct.product_code,
        },
      });
      if (isProductExist == null) {
        // console.log("Isi: ", isProductExist);
        const addedProduct = await Product.create(newProduct);
        response(201, addedProduct, "Added New Product Success", res);
      } else {
        response(404, null, "Product is Exist", res);
      }
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },
  updateProduct: async (req, res) => {
    // cek apakah ada?
    // ambil data
    // perbarui data
    // category_id ambil dari Category
    // createdBy dan updatedBy ambil dari id Employee (ambil pakai token)
    try {
      let inputData = req.body;
      const dataProduct = await Product.findOne({
        where: {
          product_code: inputData.product_code,
        },
      });
      // Check and insert to DB
      if (dataProduct == null) {
        response(403, null, "Data Not Found", res);
      } else {
        console.log("Siap update");
        await Product.update(
          {
            category_id: inputData.category_id,
            product_code: inputData.product_code,
            weight: inputData.weight,
            bpom_number: inputData.bpom_number,
          },
          {
            where: {
              product_code: inputData.product_code,
            },
          }
        );
        response(201, inputData, "Categories Update Success", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      let { product_code } = req.body;
      // Search in DB
      const dataProduct = await Product.findOne({
        where: {
          product_code: product_code,
        },
      });

      if (dataProduct == null) {
        response(404, null, "Data Not Found", res);
      } else {
        Product.destroy({
          where: {
            product_code: product_code,
          },
        });
        response(200, "", "Product Deleted", res);
      }
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },
};
