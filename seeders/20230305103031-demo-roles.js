"use strict";

const { DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          role_code: "PR01",
          role_name: "Product Manager",
          created_at: new Date(),
          created_by: "Jamal",
          updated_at: new Date(),
          updated_by: "Jamal",
        },
        {
          role_code: "A01",
          role_name: "Administrator",
          created_at: new Date(),
          created_by: "Jamal",
          updated_at: new Date(),
          updated_by: "Jamal",
        },
        {
          role_code: "M01",
          role_name: "Manager",
          created_at: new Date(),
          created_by: "Jamal",
          updated_at: new Date(),
          updated_by: "Jamal",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
