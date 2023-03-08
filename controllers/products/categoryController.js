const models = require("../../models");
const { kategori } = models;

module.exports = {
  getAllKategori: async (req, res) => {
    try {
      const allKategori = await kategori.findAll();
      res.status(200).json({
        msg: "Get all kategori",
        data: allKategori,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getKategoriByID: async (req, res) => {
    try {
      let { id } = req.params;
      const oneKategori = await kategori.findOne({ where: { kode_kategori: id } });
      res.status(200).json({
        msg: "get one kategori",
        data: oneKategori,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addKategori: async (req, res) => {
      try {
          let newKategori = await kategori.create(req.body)
          res.json({
              msg: "Added one kategori",
              newKategori: newKategori
          })
    } catch (error) {}
  },
};
