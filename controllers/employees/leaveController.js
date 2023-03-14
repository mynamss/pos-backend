const models = require("../../models");
const { Leave, Employee } = models;
const response = require("../../response");

module.exports = {
  // Table Leave
  getAllLeave: async (req, res) => {
    try {
      let dataLeave = await Leave.findAll();
      if (dataLeave == null) {
        response(404, null, "Leave not found", res);
      } else {
        response(200, dataLeave, "Get All Leave Success", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },
  getLeaveByID: async (req, res) => {
    try {
      // ambil id employee
      const employee = await Employee.findOne({
        where: {
          token: req.headers.authorization.split(" ")[1],
        },
      });
      const someLeave = await Leave.findAll({
        where: {
          employee_id: employee.id,
        },
      });
      if (someLeave === null) {
        response(404, null, "Leave not found", res);
      }
      response(200, someLeave, "Get 1 Leave Success", res);
    } catch (error) {
      response(500, null, "Internal server error", res);
    }
  },
  addLeave: async (req, res) => {
    try {
      let newLeave = req.body;
      // ambil id employee
      const employee = await Employee.findOne({
        where: {
          token: req.headers.authorization.split(" ")[1],
        },
      });

      if (employee) {
        await Leave.create({
          employee_id: employee.id,
          start_time: newLeave.startTime,
          end_time: newLeave.endTime,
          created_by: employee.id,
          updated_by: employee.id,
        });
        response(201, newLeave, "Add New Leave Success", res);
      } else {
        response(403, null, "Leave has created", res);
      }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },

  updateLeave: async (req, res) => {
    try {
      let { startTime, endTime } = req.body;
      // convert string to date object
      const employee = await Employee.findOne({
        where: {
          token: req.headers.authorization.split(" ")[1],
        },
      });
      await Leave.update(
        {
          start_time: new Date(startTime),
          end_time: new Date(endTime),
        },
        {
          where: {
            start_time: new Date(startTime),
          },
        }
      );
      const dataLeave = await Leave.findOne({
        where: {
          id: 4,
        },
      });
      console.log(typeof dataLeave.end_time);

      response(201, dataLeave, "Update Leave Success", res);
      // if (req.body != null) {
      //   console.log("Sini apa dah", startTime, endTime);
      //   // update data
      // } else {
      // }
    } catch (error) {
      response(500, error, "Internal server error", res);
    }
  },

  deleteLeave: async (req, res) => {
    try {
      const employee = await Employee.findOne({
        where: {
          token: req.headers.authorization,
        },
      });
      if (employee) {
        await Leave.destroy({
          where: {
            id: 1,
          },
        });
        response(200, "", "Leave Deleted", res);
      }
      response(404, null, "Leave Not Found", res);
    } catch (error) {
      response(500, null, "Internal server error", res);
    }
  },
};
