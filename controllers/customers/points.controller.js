const models = require("../../models");
const { Point } = models;
const response = require("../../response");

module.exports = {
  getAllPoints: async (req, res) => {
    try {
      let allPoint = await Point.findAll();

      if (allPoint.length == 0) {
        response(404, null, "Data Not Found", res);
      } else {
        response(200, allPoint, "Get All Data Success", res);
      }
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },

  getPointsByID: async (req, res) => {
    try {
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },
  addPoints: async (req, res) => {
    try {
      let { totalPoint, levelName } = req.body;

      

    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },

  updatePoints: async (req, res) => {
    try {
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },

  deletePoints: async (req, res) => {
    try {
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },

  getAllEarnedPoints: async (req, res) => {
    try {
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },

  getEarnedPointByID: async (req, res) => {
    try {
    } catch (error) {
      response(500, error, "Internal Server Error", res);
    }
  },

  addEarnedPointByID: async (req, res) => {
    // export ke sales
    try {
      
    } catch (error) {
      
    }
  }
};
