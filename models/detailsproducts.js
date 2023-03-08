"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class detailsProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      detailsProduct.belongsTo(models.productsPurchase, {
        foreignKey: "purchase_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      detailsProduct.belongsTo(models.Product, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  detailsProduct.init(
    {
      purchase_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.FLOAT,
      unit_price: DataTypes.FLOAT,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "details_products",
      underscored: true,
    }
  );
  return detailsProduct;
};
