"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class suppliersAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      suppliersAddress.hasOne(models.Supplier);
    }
  }
  suppliersAddress.init(
    {
      street_name: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      country: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "suppliers_address",
      underscored: true,
    }
  );
  return suppliersAddress;
};
