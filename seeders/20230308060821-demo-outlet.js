"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("outlets", [
      {
        company_name: "PT Danone",
        outlet_name: "DanoneMART",
        outlet_code: "DNNUNGRN01",
        slogan: "Membuat kenyang, tanpa kayang",
        email: "danone01@gmail.com",
        phone: "0812345678",
        faxmail: "(021)123",
        owner_name: "Bambang Aji",
        created_at: new Date(),
        created_by: 1,
        updated_at: new Date(),
        updated_by: 1,
      },
      {
        company_name: "PT Danone",
        outlet_name: "DanoneMART",
        outlet_code: "DNNSKRN01",
        slogan: "Murah dan halal",
        email: "danone02@gmail.com",
        phone: "0811111111",
        faxmail: "(021)222",
        owner_name: "Heri Supaat",
        created_at: new Date(),
        created_by: 1,
        updated_at: new Date(),
        updated_by: 1,
      },
      {
        company_name: "PT Danone",
        outlet_name: "DanoneMART",
        outlet_code: "DNNBMS01",
        slogan: "Sesimple itu",
        email: "danone03@gmail.com",
        phone: "0854321432",
        faxmail: "(021)444",
        owner_name: "Udin Pelek",
        created_at: new Date(),
        created_by: 2,
        updated_at: new Date(),
        updated_by: 2,
      },
    ]);
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
    await queryInterface.bulkDelete('outlets', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
