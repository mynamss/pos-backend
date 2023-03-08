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
      Point.hasOne(models.Customer);
      // 1:M
      Point.hasMany(models.earnedPoint);
    }
  }
  Point.init(
    {
      total_point: DataTypes.FLOAT,
      level_name: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Point",
      underscored: true
    }
  );
  return Point;
};
