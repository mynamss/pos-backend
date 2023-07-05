const models = require("../../models");
const { Op } = require("sequelize");
const { Employee, Outlet, outletsAddress } = models;
const { addOutletAddr, updateOutletAddr } = require("../address.controller");
const { response } = require("../../response");

const access = ["Manager", "Owner", "Administrator"];

module.exports = {
  // Table Outlets
  getAllOutlet: async (req, res) => {
    let authorize = res.locals.data.as;
    // Check by role to get access
    try {
      if (access.includes(authorize)) {
        let allOutlet = await Outlet.findAll();
        if (allOutlet.length == 0) {
          // response = (success, code, message, data, details, res)
          throw {
            success: false,
            code: 404,
            message: "Outlet not found!",
            data: null,
            details: null,
          };
        }
        return response(true, 200, "Get All Outlet Success", allOutlet, null, res);
      } else {
        // response = (success, code, message, data, details, res)
        throw {
          success: false,
          code: 403,
          message: "Access denied!",
          data: null,
          details: `You don't have access to this page`,
        };
      }
    } catch (error) {
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },
  getOutletByID: async (req, res) => {
    try {
      const { id } = req.params;
      let authorize = res.locals.data;
      // console.log(authorize.as);
      // matching email by token
      let employeeByEmail = await Employee.findOne({
        attributes: ["email"],
        where: {
          email: authorize.email,
        },
        include: [outletsAddress],
      });
      // if not match
      if (!employeeByEmail || !access.includes(authorize.as)) {
        throw {
          success: false,
          code: 403,
          message: "Access denied!",
          data: null,
          details: `You don't have access to this page`,
        };
      }
      // get outlet by id
      let outletByID = await Outlet.findOne({
        where: {
          id: id,
        },
        include: [outletsAddress, Employee],
      });
      // if not found
      if (!outletByID) {
        throw {
          success: false,
          code: 404,
          message: `Data not found!`,
          data: null,
          details: `Outlet with id ${id} not found!`,
        };
      }
      return response(true, 200, "Get outlet by id success", outletByID, null, res);
    } catch (error) {
      // console.log(error);
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },
  addOutlet: async (req, res) => {
    try {
      const input = req.body;
      let authorize = res.locals.data;
      // matching email in token
      const employee = await Employee.findOne({
        attributes: ["id", "email"],
        where: {
          email: authorize.email,
        },
      });
      // if not match
      if (!employee || !access.includes(authorize.as)) {
        throw {
          success: false,
          code: 403,
          message: "Access denied!",
          data: null,
          details: `You don't have access to this page`,
        };
      }
      // get outlet by id
      let isOutletExist = await Outlet.findOne({
        where: {
          [Op.or]: [
            {
              outlet_name: input.outlet_name || "",
            },
            {
              outlet_code: input.outlet_code || "",
            },
            {
              phone: input.phone || "",
            },
            {
              email: input.email || "",
            },
          ],
        },
      });
      // console.log("CONTENT:", isOutletExist);
      if (!isOutletExist) {
        // insert to db
        let newOutlet = await Outlet.create({
          company_name: input.company_name,
          outlet_name: input.outlet_name,
          outlet_code: input.outlet_code,
          slogan: input.slogan,
          phone: input.phone,
          email: input.email,
          owner_name: input.owner_name,
          created_by: employee.id,
          updated_by: employee.id,
        });

        // insert to outlets_addresses
        await addOutletAddr(newOutlet.id, input, employee);

        return response(true, 200, "Added new outlet successfully!", newOutlet, null, res);
      } else {
        let field, value;
        if (input.outlet_name == isOutletExist.outlet_name) {
          field = "Outlet name";
          value = input.outlet_name;
        } else if (input.outlet_code == isOutletExist.outlet_code) {
          field = "Outlet code";
          value = input.outlet_code;
        } else if (input.phone == isOutletExist.phone) {
          field = "Phone";
          value = input.phone;
        } else if (input.email == isOutletExist.email) {
          field = "Email";
          value = input.email;
        }
        throw {
          success: false,
          code: 422,
          message: `${field} is already exist!`,
          data: null,
          details: `${value} is already registered. Use another ${field.toLowerCase()}`,
        };
      }
    } catch (error) {
      // console.log(error);
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },
  updateOutlet: async (req, res) => {
    try {
      const { id } = req.params;
      const input = req.body;
      let authorize = res.locals.data;

      const employee = await Employee.findOne({
        attributes: ["id", "email"],
        where: {
          email: authorize.email,
        },
      });
      // if not match
      if (!employee || !access.includes(authorize.as)) {
        throw {
          success: false,
          code: 403,
          message: "Access denied!",
          data: null,
          details: `You don't have access to this page`,
        };
      }

      res.json({
        msg: "Update berhasil",
      });
      // await Outlet.update(
      //   {
      //     company_name: input.company_name,
      //     outlet_name: input.outlet_name,
      //     outlet_code: input.outlet_code,
      //     slogan: input.slogan,
      //     phone: input.phone,
      //   },
      //   {
      //     where: {
      //       id : id
      //     }

      //   }
      // )
      // // go to address.controller
      // await updateOutletAddr(id, input, employee.id)
      // response(true, 200, "OK", null, `Update data successfully!`, res);
    } catch (error) {
      // console.log(error);
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },

  deleteOutlet: async (req, res) => {
    try {
      const { id } = req.params;
      let authorize = res.locals.data;
      // console.log(authorize);
      let employeeWithID = await Employee.findOne({
        where: {
          email: authorize.email,
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
      if (!access.includes(authorize.as)) {
        throw {
          success: false,
          code: 403,
          message: "Access denied!",
          data: null,
          details: `You don't have access to this page`,
        };
      }
      // delete from db
      await Outlet.destroy({
        where: {
          id: id,
        },
      });

      return response(true, 200, `Delete outlet with id ${id} success`, "", null, res);
    } catch (error) {
      response(error.success, error.code, error.message, error.data, error.details, res);
    }
  },

  // Outlets Address
};
