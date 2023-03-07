"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class earnedPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      earnedPoint.belongsTo(models.Point, {
        foreignKey: "point_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
      earnedPoint.belongsTo(models.Sales, {
        foreignKey: "sale_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }
  earnedPoint.init(
    {
      sales_id: DataTypes.INTEGER,
      point_id: DataTypes.INTEGER,
      total_earned: DataTypes.FLOAT,
      earned_time: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "earned_points",
      underscored: true,
    }
  );
  return earnedPoint;
};
