const models = require("../models");
const { admins } = models;

module.exports = {
  getAllAdmin: async (req, res) => {
    try {
      const allAdmin = await admins.findAll();
      res.status(200).json({
        msg: "Success Get All User",
        data: allAdmin,
      });
      console.log(allAdmin);
    } catch (error) {
      console.log(error);
    }
  },
  addAdmin: async (req, res) => {
    res.send("Menambah Admin");
  },
};
