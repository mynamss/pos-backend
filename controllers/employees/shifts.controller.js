const models = require("../../models");
const { Shift, Employee } = models;

module.exports = {
  // Table Shifts
  getAllShift: async (req, res) => {
    try {
      let dataShift = await Shift.findAll();
      if (dataShift === null) {
        response(404, "", "Shift not found", res);
      }
      response(200, dataShift, "Get All Shifts Success", res);
    } catch (error) {
      response(500, ``, "Internal server error", res);
    }
  },
  getShiftByID: async (req, res) => {
    try {
      let id = req.params;
      // const getEmployee = await Employee.findOne()
      const someShift = await Shift.findAll(
        {
          where: {
            employee_id: id,
          },
        },
        {
          include: Employee,
          where: {
            id: id,
          },
        }
      );
      if (someShift === null) {
        response(404, "", "Shift not found", res);
      }
      response(200, someShift, "Get 1 Shifts Success", res);
    } catch (error) {
      response(500, ``, "Internal server error", res);
    }
  },
  addShift: async (req, res) => {
    try {
      let newRole = req.body;
      // Get employee by token
      let tokenEmployee = req.headers.authorization;
      const dataEmployee = await Employee.findOne({
        where: {
          token: tokenEmployee,
        },
      });
      const isShiftExist = await Shift.findAll({
        where: {
          id: dataEmployee.id,
        },
      });
      if (isShiftExist === null) {
        Shift.create({
          // role_code: newRole.roleCode,
          // role_name: newRole.roleName,
        });
        response(201, newRole, "Add New Shift Success", res);
      } else {
        response(403, "", "Shift is exist", res);
      }
    } catch (error) {
      response(500, ``, "Internal server error", res);
    }
  },

  updateShift: async (req, res) => {
    try {
      let putRole = req.body;
      const dataRole = await Shift.findOne({
        where: {
          role_code: putRole.roleCodeByFE,
        },
      });
      if (dataRole != null) {
        // update data
        Shift.update(
          {
            role_code: putRole.roleCode,
            role_name: putRole.roleName,
          },
          {
            where: {
              role_code: putRole.roleCodeByFE,
            },
          }
        );
        response(201, putRole, "Update Shift Success", res);
      } else {
        response(404, "", "Shift Not Found", res);
      }
    } catch (error) {
      response(500, ``, "Internal server error", res);
    }
  },

  deleteShift: async (req, res) => {
    try {
      let { roleCodeByFE } = req.body;
      if (roleCodeByFE != null) {
        Shift.destroy({
          where: {
            role_code: roleCodeByFE,
          },
        });
        response(200, "", "Shift Deleted", res);
      }
    } catch (error) {
      response(500, ``, "Internal server error", res);
    }
  },
};
