"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class productsPurchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      productsPurchase.belongsTo(models.Supplier, {
        foreignKey: "supplier_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      productsPurchase.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      productsPurchase.belongsToMany(models.Product, {
        through: "detailsProduct",
        foreignKey: "purchase_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  productsPurchase.init(
    {
      supplier_id: DataTypes.INTEGER,
      employee_id: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      discount: DataTypes.FLOAT,
      tax: DataTypes.FLOAT,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "productsPurchase",
      underscored: true,
    }
  );
  return productsPurchase;
};
