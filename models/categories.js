"use strict";
const { Model, TimeoutError } = require("sequelize");
const { Product } = require("./product");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categories.hasMany(models.Product);
    }
  }
  Categories.init(
    {
      category_code: DataTypes.STRING,
      category_name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Categories",
      underscored: true,
    }
  );
  return Categories;
};
