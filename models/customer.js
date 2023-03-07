"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.Point, {
        foreignKey: "point_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Customer.belongsToMany(models.Outlet, {
        through: customersOutlet,
        foreignKey: "cust_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Customer.init(
    {
      point_id: DataTypes.INTEGER,
      cust_code: DataTypes.STRING,
      member_name: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      PIN_number: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "customers",
      underscored: true,
    }
  );
  return Customer;
};
