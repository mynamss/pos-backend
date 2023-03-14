const models = require("../models");
const { Employee, employeesAddress } = models;
require("dotenv").config();

const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateToken } = require("../middlewares");
const response = require("../response");

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
      // Info, belum ngambil data dari model outlet dan role
      let {
        outletId,
        roleId,
        status,
        employeeCode,
        employeeName,
        firstName,
        lastName,
        IDCard,
        gender,
        birthdate,
        marriedStatus,
        phone,
        email,
        password,
        mainSalary,
        bonusSalary,
        entryDate,
        outDate,
        photo,
        streetName,
        district,
        city,
        province,
        country,
        postalCode,
      } = req.body;
      //   data checking
      let isEmailExist = await Employee.findOne({
        where: {
          email: email,
        },
      });
      // isNull ?
      if (isEmailExist == null) {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPwd = await bcrypt.hash(password, salt);
        // insert to DB employees
        let dataEmployee = await Employee.create({
          outlet_id: outletId,
          role_id: roleId,
          status: status,
          employee_code: employeeCode,
          employee_name: employeeName,
          first_name: firstName,
          last_name: lastName,
          id_card: IDCard,
          gender: gender,
          birthdate: birthdate,
          married_status: marriedStatus,
          phone: phone,
          email: email,
          password: hashPwd,
          main_salary: mainSalary,
          bonus_salary: bonusSalary,
          entry_date: entryDate,
          out_date: outDate,
          photo: photo,
        });
        // Insert to DB employees_addresses
        let latestEmployee = await employeesAddress.create({
          employee_id: dataEmployee.id,
          street_name: streetName,
          district: district,
          city: city,
          province: province,
          country: country,
          postal_code: postalCode,
        });
        let allData = await Employee.findAll({
          where: {
            email: email,
          },
          include: {
            model: employeesAddress,
            where: {
              employee_id: latestEmployee.employee_id,
            },
          },
        });
        response(201, allData, "Register Succes!", res);
      }
      response(403, null, "Email has been register!", res);
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },

  loginEmployee: async (req, res) => {
    try {
      let { email, password } = req.body;
      // Cek email dan pwd
      let isUserExist = await Employee.findOne({
        where: {
          email: email,
        },
      });
      if (isUserExist) {
        // Compare Pwd
        let compare = await bcrypt.compare(password, isUserExist.password);
        if (compare) {
          const tokenEmployee = {
            id: isUserExist.employee_id,
            email: isUserExist.email,
            as: "Employee",
          };
          // Generate token
          const createToken = generateToken(tokenEmployee);
          // Save token to DB Employee
          await Employee.update(
            {
              token: createToken,
            },
            {
              where: {
                email: isUserExist.email,
              },
            }
          );
          response(200, isUserExist, "Login Success!", res);
        } else {
          response(403, null, "Wrong Password!", res);
        }
      } else {
        response(404, null, "Wrong Email", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },
};
