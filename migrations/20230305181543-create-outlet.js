"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("outlets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      outlet_name: {
        type: Sequelize.STRING,
      },
      outlet_code: {
        type: Sequelize.STRING,
      },
      slogan: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      owner_name: {
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
    await queryInterface.dropTable("outlets");
  },
};
