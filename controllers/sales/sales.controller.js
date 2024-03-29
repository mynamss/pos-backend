const models = require("../../models");
const { Sales, Employee } = models;
const {response} = require("../../response");

module.exports = {
  getAllSale: async (req, res) => {
    try {
      let allSale = await Sales.findAll();
      // Checking
      if (allSale.length == 0) {
        response(404, null, "Sales Records Not Found", res);
      } else {
        response(200, allSale, "Get All Sales Success", res);
      }
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },
  getSaleByID: async (req, res) => {
    try {
      let { salescode } = req.query;

      const oneCategory = await Sales.findOne({
        where: {
          category_code: ctgcode,
        },
      });
      if (oneCategory.length == 0) {
        response(404, null, "Category not found", res);
      } else {
        response(200, oneCategory, "Get 1 Categories Success", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },
  addSale: async () => {
    // Lanjutkan ini
    let saleCode = math.random()
    const oneSale = await Sales.findOne({
      where: {
        sale_code: 124,
      },
    });

    console.log("siap menambahkan nota baru");
    return new Promise((resolve, reject) => {
      if (oneSale == null) {
        // Add new sales / invoice
        resolve("Berhasil");

      } else {
        reject("Gagal")
      }
    });
  },
  updateSale: async (req, res) => {},
  deleteSale: async (req, res) => {},
};
