const models = require("../../models");
const { Employee, Outlet, Role, employeesAddress } = models;
const { response } = require("../../response");
const { updateEmpAddr } = require("../address.controller");

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  // Table Employees
  getAllEmployee: async (req, res) => {
    let authorize = res.locals.data.as;
    // console.log(authorize);
    // Check by role to get access
    try {
      if (authorize == "Manager" || authorize == "Owner") {
        let allEmployee = await Employee.findAll();
        if (allEmployee.length == 0) {
          // response = (success, code, message, data, details, res)
          throw {
            success: false,
            code: 404,
            message: "Employee not found!",
            data: null,
            details: null,
          };
        }
        return response(true, 200, "Get All Employee Success", allEmployee, null, res);
      }
      // response = (success, code, message, data, details, res)
      throw {
        success: false,
        code: 403,
        message: "Access denied!",
        data: null,
        details: `You don't have access to this page`,
      };
      // Checking
    } catch (error) {
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },
  getEmployeeByID: async (req, res) => {
    // Check by email to get access
    try {
      let authorize = res.locals.data;
      const { id } = req.params;
      let employeeWithID = await Employee.findOne({
        where: {
          id: id,
        },
        include: [Outlet, Role, employeesAddress],
      });
      if (!employeeWithID) {
        throw {
          success: false,
          code: 404,
          message: `Data not found!`,
          data: null,
          details: `Employee with id ${id} not found!`,
        };
      }
      if (authorize.email !== employeeWithID.email) {
        throw {
          success: false,
          code: 403,
          message: "Access denied!",
          data: null,
          details: `You don't have access to this page`,
        };
      }
      return response(true, 200, "Get employee by id success", employeeWithID, null, res);
    } catch (error) {
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },
  updateEmployee: async (req, res) => {
    try {
      let authorize = res.locals.data;
      const { id } = req.params;
      const input = req.body;

      let employeeWithID = await Employee.findOne({
        where: {
          id: id,
        },
        include: [employeesAddress],
      });
      // employee not found
      if (!employeeWithID) {
        throw {
          success: false,
          code: 404,
          message: `Data not found!`,
          data: null,
          details: `Employee with id ${id} not found!`,
        };
      }
      // email not match
      if (authorize.email !== employeeWithID.email) {
        throw {
          success: false,
          code: 403,
          message: "Access denied!",
          data: null,
          details: `You don't have access to this page`,
        };
      }
      // hash the password
      async function hashPassword(pass) {
        console.log("HASH : ", pass);
        if (pass == undefined) {
          return;
        } else {
          const salt = await bcrypt.genSalt(saltRounds);
          const hashedPass = await bcrypt.hash(pass, salt);
          return hashedPass;
        }
      }
      let resultHash = await hashPassword(input.password);

      // update to db
      await Employee.update(
        {
          outlet_id: input.outlet_id,
          role_id: input.role_id,
          status: input.status,
          employee_code: input.employee_code,
          fullname: input.fullname,
          id_card: input.id_card,
          gender: input.gender,
          birthdate: new Date(input.birthdate),
          married_status: input.married_status,
          phone: input.phone,
          email: input.email,
          password: resultHash,
          main_salary: input.main_salary,
          bonus_salary: input.bonus_salary,
          entry_date: new Date(input.entry_date),
          out_date: new Date(input.out_date),
          photo: input.photo,
          updated_at: new Date(),
          updated_by: employeeWithID.id
        },
        {
          where: {
            id: id,
          },
        }
      );
      // update employee address
      await updateEmpAddr(input, employeeWithID.id);

      return response(true, 200, "Update data success", null, null, res);
    } catch (error) {
      console.log(error);
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      let authorize = res.locals.data;
      const { id } = req.params;
      console.log(authorize);
      let employeeWithID = await Employee.findOne({
        where: {
          id: id,
        },
      });
      // employee not found
      if (!employeeWithID) {
        throw {
          success: false,
          code: 404,
          message: `Data not found!`,
          data: null,
          details: `Employee with id ${id} not found!`,
        };
      }
      // emal not match
      if (authorize.email !== employeeWithID.email) {
        throw {
          success: false,
          code: 403,
          message: "Access denied!",
          data: null,
          details: `You don't have access to this page`,
        };
      }
      // delete from db
      await Employee.destroy({
        where: {
          id: id,
        },
      });

      return response(true, 200, `Delete employee with id ${id} success`, "", null, res);
    } catch (error) {
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },
};
