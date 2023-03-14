const models = require("../../models");
const { Role } = models;
const response = require("../../response");

module.exports = {
  // Table Roles
  getAllRole: async (req, res) => {
    try {
      let dataRole = await Role.findAll();
      if (dataRole === null) {
        response(404, "", "Role not found", res);
      }
      response(200, dataRole, "Get All Roles Success", res);
    } catch (error) {
      response(500, ``, "Internal server error", res);
    }
  },
  getRoleByCode: async (req, res) => {
    try {
      let { rolecode } = req.params;
      const oneRole = await Role.findOne({
        where: {
          role_code: rolecode,
        },
      });
      if (oneRole === null) {
        response(404, "", "Role not found", res);
      }
      response(200, oneRole, "Get 1 Roles Success", res);
    } catch (error) {
      response(500, ``, "Internal server error", res);
    }
  },
  addRole: async (req, res) => {
    try {
      let newRole = req.body;
      const isRoleExist = await Role.findOne({
        where: {
          role_code: newRole.roleCode,
        },
      });
      if (isRoleExist === null) {
        Role.create({
          role_code: newRole.roleCode,
          role_name: newRole.roleName,
        });
        response(201, newRole, "Add New Role Success", res);
      } else {
        response(403, "", "Role is exist", res);
      }
    } catch (error) {
      response(500, ``, "Internal server error", res);
    }
  },
  updateRole: async (req, res) => {
    try {
      let putRole = req.body;
      const dataRole = await Role.findOne({
        where: {
          role_code: putRole.roleCodeByFE,
        },
      });
      if (dataRole != null) {
        // update data
        Role.update(
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
        response(201, putRole, "Update Role Success", res);
      } else {
        response(404, "", "Role Not Found", res);
      }
    } catch (error) {
      response(500, ``, "Internal server error", res);
    }
  },

  deleteRole: async (req, res) => {
    try {
      let { roleCodeByFE } = req.body;
      if (roleCodeByFE != null) {
        Role.destroy({
          where: {
            role_code: roleCodeByFE,
          },
        });
        response(200, "", "Role Deleted", res);
      }
    } catch (error) {
      response(500, ``, "Internal server error", res);
    }
  },
};
