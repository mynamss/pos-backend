const models = require("../../models");
const { outlets, o_address } = models;

module.exports = {
  // Table Outlets
  getAllOutlet: async (req, res) => {
    try {
    } catch (error) {}
  },
  getOutletByID: async (req, res) => {
    try {
    } catch (error) {}
  },
  addOutlet: async (req, res) => {
    try {
      const {
        address_id,
        company_name,
        outlet_name,
        outlet_code,
        slogan,
        email,
        phone,
        faxmail,
        owner_name,
        created_by, 
      } = req.body;

      let newOutlet = {
        address_id: address_id,
        company_name: company_name,
        outlet_name: outlet_name,
        outlet_code: outlet_code,
        slogan: slogan,
        email: email,
        phone: phone,
        faxmail: faxmail,
        owner_name: owner_name,
        created_by: created_by
      };
      // check datas in db
      const isOutletExist = await outlets.findOne({
        where: {
          email: newOutlet.email
        }
      });

      if (isOutletExist == null) {
        // insert to db
        await outlets.create({
          address_id: address_id,
          company_name: company_name,
          outlet_name: outlet_name,
          outlet_code: outlet_code,
          slogan: slogan,
          email: email,
          phone: phone,
          faxmail: faxmail,
          owner_name: owner_name,
          created_by:created_by
        })

        res.status(201).json({
          "success": true,
          "message": "New Outlet Successfully Added!",
          "payload": newOutlet
        })
      } else {
        res.status(400).json({
          "success": false,
          "message": "New Outlet Failed to Added!",
          "payload": ""
        })
      }
    } catch (error) {
      return error;
    }
  },

  updateOutlet: async (req, res) => {
    try {
      const {
        address_id,
        company_name,
        outlet_name,
        outlet_code,
        slogan,
        email,
        phone,
        faxmail,
        owner_name,
        created_by, 
      } = req.body;
    } catch (error) {}
  },

  deleteOutlet: async (req, res) => {
    try {
    } catch (error) {}
  },

  // Outlets Address
};
