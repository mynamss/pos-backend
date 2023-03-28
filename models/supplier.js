"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Supplier.hasOne(models.suppliersAddress);

    }
  }
  Supplier.init(
    {
      company_code: DataTypes.STRING,
      company_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      faxmail: DataTypes.STRING,
      company_logo: DataTypes.STRING,
      motto: DataTypes.STRING,
      desc: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Supplier",
      underscored: true,
    }
  );
  return Supplier;
};
