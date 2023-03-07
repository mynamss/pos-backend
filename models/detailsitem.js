"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class detailsItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      detailsItem.belongsTo(models.Sales, {
        foreignKey: "sale_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
      detailsItem.belongsTo(models.Product, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }
  detailsItem.init(
    {
      product_id: DataTypes.INTEGER,
      sale_id: DataTypes.INTEGER,
      quantity: DataTypes.FLOAT,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "details_items",
      underscored: true,
    }
  );
  return detailsItem;
};
