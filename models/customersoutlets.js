"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customersOutlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // M:M
      customersOutlet.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      customersOutlet.belongsTo(models.Outlet, {
        foreignKey: "outlet_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }
  customersOutlet.init(
    {
      outlet_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      cust_today: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "customersOutlet",
      underscored: true,
    }
  );
  return customersOutlet;
};
