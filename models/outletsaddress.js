"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class outletsAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      outletsAddress.belongsTo(models.Outlet, {
        foreignKey: "outlet_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  outletsAddress.init(
    {
      outlet_id: DataTypes.INTEGER,
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
      modelName: "outlets_address",
      underscored: true,
    }
  );
  return outletsAddress;
};
