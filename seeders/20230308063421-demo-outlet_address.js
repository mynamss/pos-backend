"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "outlets_address",
      [
        {
          outlet_id: 1,
          street_name: "Jalan Mangga",
          district: "Ungaran",
          city: "Ungaran",
          province: "Jawa Tengah",
          country: " Indonesia",
          postal_code: "11111",
          created_at: new Date(),
          created_by: 1,
          updated_at: new Date(),
          updated_by: 1,
        },
        {
          outlet_id: 2,
          street_name: "Jalan Melati",
          district: "Gunungpati",
          city: "Semarang",
          province: "Jawa Tengah",
          country: " Indonesia",
          postal_code: "22222",
          created_at: new Date(),
          created_by: 1,
          updated_at: new Date(),
          updated_by: 1,
        },
        {
          outlet_id: 3,
          street_name: "Jalan jalan",
          district: "Baturraden",
          city: "Banyumas",
          province: "Jawa Tengah",
          country: " Indonesia",
          postal_code: "33333",
          created_at: new Date(),
          created_by: 2,
          updated_at: new Date(),
          updated_by: 2,
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
