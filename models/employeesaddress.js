'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeesAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      employeesAddress.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  employeesAddress.init({
    street_name: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'employees_address',
    underscored: true
  });
  return employeesAddress;
};