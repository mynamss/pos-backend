const jwt = require("jsonwebtoken");
require("dotenv").config;
const { SECRET_KEY } = process.env;
const { response } = require("../response");

module.exports = {
  generateToken: (data) => {
    const token = jwt.sign({ data }, SECRET_KEY, { expiresIn: "1d" });
    return token;
  },
  verifyToken: async (req, res, next) => {
    try {
      const tokenUser = req.headers.authorization;
      if (!tokenUser) {
        throw {
          success: false,
          code: 401,
          message: "Unauthorized!",
          data: null,
          details: `Token does not exist, the page cannot be accessed`,
        };
      }
      const { id } = req.params;
      jwt.verify(tokenUser.split(" ")[1], SECRET_KEY, (err, decoded) => {
        if (err) {
          throw {
            success: false,
            code: 406,
            message: "Invalid token. Please try again!",
            data: null,
            details: err,
          };
        } else {
          // console.log("JWT verified successfully:", decoded);
          res.locals.data = decoded["data"];
          // console.log("DATA: ", decoded["data"].as);
          next();
        }
      });
    } catch (error) {
      console.log(error);
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },
  allowedEmployee: async (req, res, next) => {
    const token = req.headers.authorization;
    const verify = jwt.verify(await token.split(" ")[1], SECRET_KEY);
    next();
  },
  allowedCustomer: (req, res, next) => {
    console.log("KAMU PUNYA HAK");
  },
};
