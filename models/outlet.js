"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //  1 to 1
      Outlet.hasOne(models.outletsAddress);
      // 1 to M
      Outlet.hasMany(models.Employee);
      // M to M
      Outlet.belongsToMany(models.Product, {
        through: productsOutlet,
        foreignKey: "outlet_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Outlet.belongsToMany(models.Supplier, {
        through: suppliersOutlet,
        foreignKey: "outlet_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Outlet.belongsToMany(models.Customer, {
        through: customersOutlet,
        foreignKey: "outlet_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Outlet.init(
    {
      company_name: DataTypes.STRING,
      outlet_name: DataTypes.STRING,
      outlet_code: DataTypes.STRING,
      slogan: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      faxmail: DataTypes.STRING,
      owner_name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "outlets",
      underscored: true,
    }
  );
  return Outlet;
};
