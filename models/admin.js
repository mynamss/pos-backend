"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  admin.init(
    {
      produk_id: DataTypes.INTEGER,
      shift_id: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      no_telp: DataTypes.STRING,
      password: DataTypes.STRING,
      alamat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "admins",
      underscored: true
    }
  );
  return admin;
};
