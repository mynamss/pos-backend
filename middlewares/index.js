const jwt = require("jsonwebtoken");
require("dotenv").config;
const { SECRET_KEY } = process.env;
const response = require("../response");

module.exports = {
  generateToken: (data) => {
    const token = jwt.sign({ data }, SECRET_KEY, {
      expiresIn: "1 days",
    });
    return token;
  },
  verifyToken: async (req, res, next) => {
    try {
      const tokenUser = req.headers.authorization;
      const { id } = req.params;
      const verify = jwt.verify(await tokenUser.split(" ")[1], SECRET_KEY);

      if (verify) {
        next();
      } else {
        response(406, null, "Invalid Token!", res);
      }
    } catch (error) {
      response(401, null, "Unauthorized!", res);
    }
  },
  allowedEmployee: async (req, res) => {
    const token = req.headers.authorization;
    const verify = jwt.verify(await token.split(" ")[1], SECRET_KEY);
    res.json({
      data: verify.data.as,
    });
  },
  allowedCustomer: (req, res, next) => {
    console.log("KAMU PUNYA HAK");
  },
};
