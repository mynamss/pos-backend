"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Leave.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Leave.init(
    {
      employee_id: DataTypes.INTEGER,
      leave_code: DataTypes.STRING,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Leave",
      underscored: true,
    }
  );
  return Leave;
};
