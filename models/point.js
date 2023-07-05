"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 1:1
      Point.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // 1:M
      Point.hasMany(models.earnedPoint);
    }
  }
  Point.init(
    {
      customer_id: DataTypes.INTEGER,
      total_point: DataTypes.FLOAT,
      level_name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Point",
      underscored: true,
    }
  );
  return Point;
};
