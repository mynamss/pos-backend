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
      Customer.hasOne(models.Point)
      Customer.belongsToMany(models.Outlet, {
        through: "customersOutlet",
        foreignKey: "cust_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Customer.init(
    {
      cust_code: DataTypes.STRING,
      member_name: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      pin_number: DataTypes.INTEGER,
      token: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
      underscored: true,
    }
  );
  return Customer;
};
