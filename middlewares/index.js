const jwt = require('jsonwebtoken');
require('dotenv').config;
const { SECRET_KEY } = process.env;

module.exports = {
    generateToken: (data) => {
        const token = jwt.sign({ data }, SECRET_KEY, {
            expiresIn: "1 days"
        })
        return token;
    },
    verifyToken: (req, res, next) => {
      try {
          const tokenUser = req.headers.authorization;
          const { id } = req.params;
          const verify = jwt.verify(token.split(' ')[1], SECRET_KEY);
          if (verify) {
            next()
          } else {
              
          }
      } catch (error) {
        
      }  
    }
}