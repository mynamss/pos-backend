const models = require("../models");
const { customers, employees } = models;
require("dotenv").config();

const { generateToken } = require("../middlewares");
const saltRounds = 10;
const bcrypt = require("bcrypt");

module.exports = {
  // Customers
  registerCust: async (req, res) => {
    try {
      let {} = req.body;

      res.send("register sukses");
    } catch (error) {}
  },
  loginCust: async (req, res) => {
    res.send("login sukses");
  },

  // Employees
  registerEmployee: async (req, res) => {
    try {
      let {
        outlet_id,
        role_id,
        address_id,
        shift_id,
        status_id,
        employee_code,
        employee_name,
        first_name,
        last_name,
        ID_card,
        gender,
        birthdate,
        married_status,
        phone,
        email,
        password,
        main_salary,
        bonus_salary,
        entry_date,
        out_date,
        photo,
        created_by,
      } = req.body;
      //   data checking
      let isEmailExist = await employees.findOne({ where: { email: email } });

      if (isEmailExist == null) {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);

        await employees.create({
          outlet_id: outlet_id,
          role_id: role_id,
          address_id: address_id,
          shift_id: shift_id,
          status_id: status_id,
          employee_code: employee_code,
          employee_name: employee_name,
          first_name: first_name,
          last_name: last_name,
          ID_card: ID_card,
          gender: gender,
          birthdate: birthdate,
          married_status: married_status,
          phone: phone,
          email: email,
          password: password,
          main_salary: main_salary,
          bonus_salary: bonus_salary,
          entry_date: entry_date,
          out_date: out_date,
          photo: photo,
          created_by: created_by,
        });

        res.status(201).json({});
      } else {
        console.log("Email sudah terdaftar");
      }
    } catch (error) {}
  },

  loginEmployee: async (req, res) => {
    res.send("login sukses");
  },
};
