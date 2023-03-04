"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("kategoris", [
      {
        kode_kategori: "M01",
        nama_kategori: "Makanan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kode_kategori: "M02",
        nama_kategori: "Minuman",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        kode_kategori: "S01",
        nama_kategori: "Sayur",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("kategoris", null, {});
  },
};
