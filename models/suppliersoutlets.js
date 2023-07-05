"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class suppliersOutlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      suppliersOutlet.belongsTo(models.Supplier, {
        foreignKey: "supplier_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      suppliersOutlet.belongsTo(models.Outlet, {
        foreignKey: "outlet_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  suppliersOutlet.init(
    {
      supplier_id: DataTypes.INTEGER,
      outlet_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "suppliersOutlet",
      underscored: true,
    }
  );
  return suppliersOutlet;
};
