const models = require("../models");
const { Op } = require("sequelize");
const { Employee, employeesAddress, Customer, Point, Outlet, Role } = models;
const { addEmpAddr } = require("../controllers/address.controller");
require("dotenv").config();

const bcrypt = require("bcrypt");
const saltRounds = 10;
const { generateToken } = require("../middlewares");
const { response } = require("../response");

module.exports = {
  // Customers
  registerCust: async (req, res) => {
    try {
      // Gender pakai string lowercase
      let cust = req.body;

      let isCustExist = await Customer.findOne({
        where: {
          email: cust.email,
        },
      });
      // checking and insert to DB
      if (isCustExist == null) {
        // Hash pwd -> Hash PIN -> create to DB -> create point
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPwd = await bcrypt.hash(cust.password, salt);
        // const hashedPIN = await bcrypt.hash(cust.pin_"number", salt);

        // Insert to DB Customer
        let newCust = await Customer.create({
          cust_code: cust.cust_code,
          member_name: cust.member_name,
          first_name: cust.first_name,
          last_name: cust.last_name,
          gender: cust.gender,
          phone: cust.phone,
          email: cust.email,
          password: hashedPwd,
          pin_number: cust.pin_number,
        });
        // Insert to DB Point
        await Point.create({
          customer_id: newCust.id,
          total_point: 1000,
          level_name: "Bronze",
          created_by: newCust.id,
          updated_by: newCust.id,
        });
        // Update
        await Customer.update(
          {
            created_by: newCust.id,
            updated_by: newCust.id,
          },
          {
            where: {
              email: newCust.email,
            },
          }
        );
        response(201, newCust, "Register Success", res);
      } else {
        response(403, null, "Email has been register!", res);
      }
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },
  loginCust: async (req, res) => {
    try {
      let inputData = req.body;
      let checkCust = await Customer.findOne({
        where: {
          email: inputData.email,
        },
      });
      // checking
      if (checkCust == null) {
        response(404, null, "User Not Found", res);
      } else {
        let compare = await bcrypt.compare(inputData.password, checkCust.password);
        if (compare) {
          // Buat token dan update ke db
          const tokenCust = {
            pin_number: checkCust.pin_number,
            as: "Member",
          };
          const newToken = generateToken(tokenCust);
          await Customer.update(
            {
              token: newToken,
            },
            {
              where: {
                email: checkCust.email,
              },
            }
          );
          // console.log("Isi: ", checkCust);
          response(200, { newToken, tokenCust }, "Login Success", res);
        } else {
          response(403, null, "Wrong Password!", res);
        }
      }
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },

  // Employees
  registerEmployee: async (req, res) => {
    try {
      const newEmp = req.body;

      // data checking
      let isEmailExist = await Employee.findOne({
        where: {
          email: newEmp.email,
        },
      });
      let isNameExist = await Employee.findOne({
        where: {
          fullname: newEmp.fullname,
        },
      });
      let isIDCardsExist = await Employee.findOne({
        where: {
          id_card: newEmp.id_card,
        },
      });
      let isPhoneExist = await Employee.findOne({
        where: {
          phone: newEmp.phone,
        },
      });

      // checking
      if (isEmailExist) {
        console.log("Email sudah terdaftar");
        throw {
          success: false,
          code: 409,
          message: "Email is already registered!",
          data: null,
          details: `${newEmp.email} has been registered!`,
        };
      } else if (isNameExist) {
        console.log("Nama sudah terdaftar");
        throw {
          success: false,
          code: 409,
          message: "Name is already registered!",
          data: null,
          details: `${newEmp.fullname} has been registered!`,
        };
      } else if (isIDCardsExist) {
        console.log("ID sudah terdaftar");
        throw {
          success: false,
          code: 409,
          message: "ID Cards is already registered!",
          data: null,
          details: `${newEmp.id_card} has been registered!`,
        };
      } else if (isPhoneExist) {
        console.log("Phone sudah terdaftar");
        throw {
          success: false,
          code: 409,
          message: "Phone is already registered!",
          data: null,
          details: `${newEmp.phone} has been registered!`,
        };
      } else {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPwd = await bcrypt.hash(newEmp.password, salt);

        // insert to DB employees
        const employee = await Employee.create({
          outlet_id: newEmp.outlet_id,
          role_id: newEmp.role_id,
          status: newEmp.status,
          employee_code: newEmp.employee_code,
          fullname: newEmp.fullname,
          id_card: newEmp.id_card,
          gender: newEmp.gender,
          birthdate: new Date(newEmp.birthdate),
          married_status: newEmp.married_status,
          phone: newEmp.phone,
          email: newEmp.email.toLowerCase(),
          password: hashPwd,
          main_salary: newEmp.main_salary,
          bonus_salary: newEmp.bonus_salary,
          entry_date: new Date(newEmp.entry_date),
          out_date: new Date(newEmp.out_date),
          photo: newEmp.photo,
        });
        // add author
        await Employee.update(
          {
            created_by: employee.id, 
            updated_by: employee.id 
          },
          {
            where: {
              email: employee.email,
            },
          }
        )
        // insert to employees_addresses
        await addEmpAddr(newEmp, employee)
        
        return response(true, 201, "Register success!", "", "", res);
      }
    } catch (error) {
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },

  loginEmployee: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      // checking email and password
      const isUserExist = await Employee.findOne({
        where: {
          [Op.or]: [{ email: email || "" }, { fullname: fullname || "" }],
        },
        include: [Role],
      });
      // if not found
      if (!isUserExist) {
        throw {
          success: false,
          code: 404,
          data: null,
          message: "User not found!",
          details: `Username or email entered is not found!`,
        };
      }

      // compare pass
      let compare = await bcrypt.compare(password, isUserExist.password);
      // if not match
      if (!compare) {
        throw {
          success: false,
          code: 409,
          data: null,
          message: "Wrong Password!",
          details: `The password entered is incorrect!`,
        };
      }

      const tokenEmployee = {
        code: isUserExist.employee_code,
        email: isUserExist.email,
        as: isUserExist.Role.role_name,
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
      // response = (success, code, message, data, details, res)
      return response(true, 201, "Login Success!", { token: createToken }, "", res);
    } catch (error) {
      console.log(error);
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },
};
