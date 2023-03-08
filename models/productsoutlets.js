'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productsOutlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      productsOutlet.belongsTo(models.Outlet, {
        foreignKey: "outlet_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
      productsOutlet.belongsTo(models.Product, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }
  productsOutlet.init({
    outlet_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    total_product: DataTypes.FLOAT,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'productsOutlet',
    underscored: true
  });
  return productsOutlet;
};