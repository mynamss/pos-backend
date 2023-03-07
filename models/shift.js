"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shift.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Shift.init(
    {
      employe_id: DataTypes.INTEGER,
      shift_code: DataTypes.STRING,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "shifts",
      underscored: true,
    }
  );
  return Shift;
};
