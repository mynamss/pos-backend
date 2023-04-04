"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      outlet_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "outlets",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status: {
        type: Sequelize.STRING,
      },
      employee_code: {
        type: Sequelize.STRING,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      id_card: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      birthdate: {
        type: Sequelize.DATEONLY,
      },
      married_status: {
        type: Sequelize.BOOLEAN,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      main_salary: {
        type: Sequelize.FLOAT,
      },
      bonus_salary: {
        type: Sequelize.FLOAT,
      },
      entry_date: {
        type: Sequelize.DATE,
      },
      out_date: {
        type: Sequelize.DATE,
      },
      photo: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_by: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employees");
  },
};
