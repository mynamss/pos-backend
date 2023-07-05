const models = require("../../models");
const { Role, Employee } = models;
const { response, errResponse } = require("../../response");

// export
module.exports = {
  getAllRole: async (req, res) => {
    
    const allRole = await Role.findAll();

    try {
      // checking
      if (allRole == null) {
        errResponse(404, "", "Data not found", res);
      } else {
        response(200, allRole, "Get all roles successfully", res);
      }
    } catch (error) {
      errResponse(500, error, "Internal server error", res);
    }
  },
  getRoleByID: async (req, res) => {
    try {
      const { id } = req.params;
      const oneRole = await Role.findOne({
        where: {
          id: id,
        },
      });
      if (oneRole == null) {
        errResponse(404, null, "Role not found", res);
      } else {
        response(200, oneRole, "Get 1 role successfully", res);
      }
    } catch (error) {
      errResponse(500, error, "Internal server error", res);
    }
  },
  addRole: async (req, res) => {
    try {
      const newRole = req.body;
      const isRoleExist = await Role.findOne({
        where: {
          role_name: newRole.roleName,
        },
      });
      // checking
      if (isRoleExist == null) {
        // get employee to fill created_by and updated_by
        const employee = await Employee.findOne({
          where: {
            token: req.headers.authorization.split(" ")[1],
          },
        });
        // insert to DB
        const addedRole = await Role.create({
          role_code: newRole.roleCode,
          role_name: newRole.roleName,
          created_by: employee.id,
          updated_by: employee.id,
        });
        response(201, addedRole, "Add new role successfully", res);
      } else {
        errResponse(422, "", "Role is exist", res);
      }
    } catch (error) {
      errResponse(500, error, "Internal server error", res);
    }
  },
  updateRole: async (req, res) => {
    try {
      const { id } = req.params;
      const putRole = req.body;
      // get role by id
      const role = await Role.findOne({
        where: {
          id: id,
        },
      });
      if (role) {
        // get employee to fill created_by and updated_by
        const employee = await Employee.findOne({
          where: {
            token: req.headers.authorization.split(" ")[1],
          },
        });
        // update data
        await Role.update(
          {
            role_code: putRole.roleCode,
            role_name: putRole.roleName,
            updated_by: employee.id,
          },
          {
            where: {
              id: id,
            },
          }
        );
        response(201, putRole, "Update role successfully", res);
      } else {
        response(404, null, "Role not found", res);
      }
    } catch (error) {
      console.log(error);
      errResponse(500, error, "Internal server error", res);
    }
  },

  deleteRole: async (req, res) => {
    try {
      const { id } = req.params;
      const isRoleExist = await Role.findOne({
        where: {
          id: id,
        },
      });
      if (isRoleExist) {
        const data = await Role.destroy({
          where: {
            id: id,
          },
        });
        console.log("data:", data);
        response(200, "", "Role Deleted", res);
      } else {
        errResponse(404, null, "Role not found", res);
      }
    } catch (error) {
      errResponse(500, error, "Internal server error", res);
    }
  },

  deleteAllRole: async (req, res) => {
    try {
      const data = await Role.destroy({
        truncate: true
      })
      console.log("datas:", data);
      response(200, "", "All Role Deleted", res);
    } catch (error) {
      console.log("Error : ",error.parent.sqlMessage);
      errResponse(500, error, "Internal server error", res);
    }
  }
};
