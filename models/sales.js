'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sales.hasOne(models.earnedPoint)
      
      Sales.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
      Sales.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })

      Sales.belongsToMany(models.Product, {
        through: "detailsItem",
        foreignKey: "sale_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }
  Sales.init({
    sale_code: DataTypes.STRING,
    employee_id: DataTypes.INTEGER,
    cust_id: DataTypes.INTEGER,
    total_product: DataTypes.FLOAT,
    total_price: DataTypes.FLOAT,
    tendered: DataTypes.FLOAT,
    change: DataTypes.FLOAT,
    tax: DataTypes.FLOAT,
    sum_point: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sales',
    underscored: true
  });
  return Sales;
};