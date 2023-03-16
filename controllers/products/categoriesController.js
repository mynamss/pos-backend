const models = require("../../models");
const { Categories } = models;
const response = require("../../response");

module.exports = {
  getAllCategory: async (req, res) => {
    try {
      let allCategory = await Categories.findAll();
      // Checking
      if (allCategory.length == 0) {
        response(404, null, "Categories Not Found", res);
      } else {
        response(200, allCategory, "Get All Categories Success", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },
  getCategoryByID: async (req, res) => {
    try {
      let { ctgcode } = req.query;
      
      const oneCategory = await Categories.findOne({
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
  addCategory: async (req, res) => {
    try {
      let newCategory = req.body;

      let isCategoryExist = await Categories.findOne({
        where: {
          category_code: newCategory.category_code,
        },
      });
      // Check and insert to DB
      if (isCategoryExist == null) {
        let result = await Categories.create(newCategory);
        response(201, result, "Added Categories Success", res);
      } else {
        response(403, isCategoryExist, "Category is exist", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },
  updateCategory: async (req, res) => {
    // cek apakah ada?
    // ambil data
    // perbarui data
    try {
      let { category_code, category_name } = req.body;

      let dataCategory = await Categories.findOne({
        where: {
          category_code: category_code,
        },
      });
      // Check and insert to DB
      if (category_code == dataCategory.category_code && category_name == dataCategory.category_name) {
        console.log("Masuk sini ga si");
        response(403, null, "No Changes, same Data", res);
      } else {
        await Categories.update(
          {
            category_code: category_code,
            category_name: category_name,
          },
          {
            where: {
              category_code: category_code,
            },
          }
        );
        response(201, { category_code, category_name }, "Categories Update Success", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      let { category_code } = req.body;
      // Search in DB
      let dataCategory = await Categories.findOne({
        where: {
          category_code: category_code,
        },
      });

      if (dataCategory == null) {
        response(404, null, "Data Not Found", res);
      } else {
        Categories.destroy({
          where: {
            category_code: category_code,
          },
        });
        response(200, "", "Category Deleted", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },
};
