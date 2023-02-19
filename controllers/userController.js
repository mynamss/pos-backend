// const models = require('./models');
const user = {
  1: {
    nama: "Ali",
    kelas: 12,
  },
  2: {
    nama: "Ali",
    kelas: 12,
  },
  3: {
    nama: "Ali",
    kelas: 12,
  },
};

module.exports = {
  getAllUser: async (req, res) => {
    res.json(user)
        console.log("All User found");
  },
};
