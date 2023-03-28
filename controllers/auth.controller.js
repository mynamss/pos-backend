const models = require("../models");
const { Employee, employeesAddress, Customer, Point, Outlet } = models;
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
        // const hashedPIN = await bcrypt.hash(cust.pin_number, salt);

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
      // Info, belum ngambil data dari model outlet dan role
      // PERBAIKI VALIDASI SETIAP DATA
      const newEmp = req.body;
      //   data checking
      let isEmailExist = await Employee.findOne({
        where: {
          email: newEmp.email,
        },
      });
      // checking
      if (isEmailExist == null) {
        // const outlet = await Outlet.findOne({
        //   where: {
        //     outlet_code: newEmp.outletCode,
        //   },
        // });
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPwd = await bcrypt.hash(newEmp.password, salt);
        // insert to DB employees
        let dataEmployee = await Employee.create({
          outlet_id: newEmp.outletID,
          role_id: newEmp.roleID,
          status: newEmp.status,
          employee_code: newEmp.employeeCode,
          employee_name: newEmp.employeeName,
          first_name: newEmp.firstName,
          last_name: newEmp.lastName,
          id_card: newEmp.IDCard,
          gender: newEmp.gender,
          birthdate: new Date(newEmp.birthdate),
          married_status: newEmp.marriedStatus,
          phone: newEmp.phone,
          email: newEmp.email,
          password: hashPwd,
          main_salary: newEmp.mainSalary,
          bonus_salary: newEmp.bonusSalary,
          entry_date: newEmp.entryDate,
          out_date: newEmp.outDate,
          photo: newEmp.photo,
        });
        // Insert to DB employees_addresses
        let latestEmployee = await employeesAddress.create({
          employee_id: dataEmployee.id,
          street_name: newEmp.streetName,
          district: newEmp.district,
          city: newEmp.city,
          province: newEmp.province,
          country: newEmp.country,
          postal_code: newEmp.postalCode,
        });
        let allData = await Employee.findAll({
          where: {
            email: newEmp.email,
          },
          include: {
            model: employeesAddress,
            where: {
              employee_id: latestEmployee.employee_id,
            },
          },
        });
        response(201, allData, "Register Succes!", res);
      } else {
        response(403, null, "Email has been register!", res);
      }
    } catch (error) {
      console.log(error);
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
          response(200, { token: createToken }, "Login Success!", res);
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
