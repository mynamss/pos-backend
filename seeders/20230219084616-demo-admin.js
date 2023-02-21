"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("admins", [
      {
        produk_id: 1,
        shift_id: 1,
        nama: "Nunung",
        email: "nunung123@gmail.com",
        no_telp: "08123456789",
        password: "nunung12!@",
        alamat: "Jl.Kalimasada Sekaran, Semarang",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        produk_id: 2,
        shift_id: 2,
        nama: "Ali",
        email: "ali456@gmail.com",
        no_telp: "08987654321",
        password: "ali45!@",
        alamat: "Jl.Kalimasada Sekaran, Semarang",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        produk_id: 3,
        shift_id: 3,
        nama: "Maulana",
        email: "maulana789@gmail.com",
        no_telp: "08111111111",
        password: "maulana78!@",
        alamat: "Jl.Abimanyu Patemon, Semarang",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", null, {});
  },
};
