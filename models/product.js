"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Categories, {
        foreignKey: "category_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Product.belongsToMany(models.productsPurchase, {
        through: "detailsProduct",
        foreignKey: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Product.belongsToMany(models.Outlet, {
        through: "productsOutlet",
        foreignKey: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Product.belongsToMany(models.Sales, {
        through: "detailsItem",
        foreignKey: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Product.init(
    {
      category_id: DataTypes.INTEGER,
      product_code: DataTypes.STRING,
      product_name: DataTypes.STRING,
      barcode_id: DataTypes.STRING,
      weigth: DataTypes.FLOAT,
      stock: DataTypes.INTEGER,
      unit_price: DataTypes.FLOAT,
      sell_price: DataTypes.FLOAT,
      desc: DataTypes.STRING,
      image_link: DataTypes.STRING,
      exp_date: DataTypes.DATEONLY,
      bpom_number: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      underscored: true,
    }
  );
  return Product;
};
