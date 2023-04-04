"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 1 : 1
      Employee.belongsTo(models.Outlet, {
        foreignKey: "outlet_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Employee.belongsTo(models.Role, {
        foreignKey: "role_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Employee.hasOne(models.employeesAddress);
      Employee.hasOne(models.Shift);
      Employee.hasOne(models.productsPurchase);
      Employee.hasOne(models.Sales);
      // 1 : M
      Employee.hasMany(models.Leave);
    }
  }
  Employee.init(
    {
      outlet_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      employee_code: DataTypes.STRING,
      fullname: DataTypes.STRING,
      id_card: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      married_status: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      main_salary: DataTypes.FLOAT,
      bonus_salary: DataTypes.FLOAT,
      entry_date: DataTypes.DATE,
      out_date: DataTypes.DATE,
      photo: DataTypes.STRING,
      token: DataTypes.STRING,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Employee",
      underscored: true,
    }
  );
  return Employee;
};
