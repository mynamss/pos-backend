const models = require("../models");
const { User } = models;
require("dotenv").config();

const {generateToken} = require('../middlewares');
const saltRounds = 10
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        try {
            res.send('register sukses')
        } catch (error) {
            
        }
    },
    login : async (req, res) => {
        res.send('login sukses')
    },
}