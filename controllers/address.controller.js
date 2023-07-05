const models = require("../models");
const { employeesAddress, outletsAddress, suppliersAddress } = models;
const { response } = require("../response");

module.exports = {
  // employee address
  getAllEmpAddr: async (req, res) => {
    try {
      let authorize = res.locals.data.as;
      if (authorize == "Manager" || authorize == "Owner") {
        let allAddr = await employeesAddress.findAll();
        if (allAddr.length == 0) {
          // response = (success, code, message, data, details, res)
          throw {
            success: false,
            code: 404,
            message: "Data not found!",
            data: null,
            details: "All employee address not found!",
          };
        }
        return response(true, 200, "Get employee address success", allAddr, null, res);
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
  // getEmpAddrByID: async (req, res) => {
  //   try {
  //     let authorize = res.locals.data;
  //     if (authorize == "Manager" || authorize == "Owner") {
  //       const employeeAddr = await employeesAddress.findOne({
  //         where: {
  //           employee_id: req.params.id,
  //         },
  //       });
  //       if (!employeeAddr) {
  //         throw {
  //           success: false,
  //           code: 404,
  //           message: `Address with id ${id} not found!`,
  //           data: null,
  //           details: null,
  //         };
  //       }

  //       return response(true, 200, "Get employee address by id success", employeeAddr, null, res);
  //     }
  //   } catch (error) {
  //     response(error.success, error.code, error.message, error.data, error.details, res);
  //     //   return error;
  //   }
  // },
  
  addEmpAddr: async (newAddr, employee) => {
    if (!newAddr) {
      throw {
        success: false,
        code: 422,
        message: "Address cannot be empty",
        data: null,
        details: `The address data entered is still empty.`,
      };
    }
    await employeesAddress.create({
      employee_id: employee.id,
      street_name: newAddr.street_name,
      district: newAddr.district,
      city: newAddr.city,
      province: newAddr.province,
      country: newAddr.country,
      postal_code: newAddr.postal_code,
      created_by: employee.id,
      created_by: employee.id,
    });
  },
  updateEmpAddr: async (address, employeeID) => {
    // address is empty
    if (!address) {
      return;
    }
    // update address to db
    await employeesAddress.update(
      {
        street_name: address.street_name,
        district: address.district,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code,
        updated_at: new Date(),
        updated_by: employeeID.id,
      },
      {
        where: {
          employee_id: employeeID.id,
        },
      }
    );
  },

  // outlets address
  getAllOutletAddr: async (req, res) => {
    try {
      let authorize = res.locals.data;
      if (authorize == "Manager" || authorize == "Owner") {
        let allAddr = await outletsAddress.findAll();
        if (allAddr.length == 0) {
          // response = (success, code, message, data, details, res)
          throw {
            success: false,
            code: 404,
            message: "Data not found!",
            data: null,
            details: "All outlet address not found!",
          };
        }
        return response(true, 200, "Get outlet address success", allAddr, null, res);
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
  getOutletAddrByID: async (req, res) => {
    res.json({
      msg: "outlet address by id",
    });
  },
  // insert to outlets_addresses
  addOutletAddr: async (outletID, newAddr, employee) => {
    if (!newAddr) {
      throw {
        success: false,
        code: 422,
        message: "Address cannot be empty",
        data: null,
        details: `The address data entered is still empty.`,
      };
    }
    await outletsAddress.create({
      outlet_id: outletID,
      street_name: newAddr.street_name,
      district: newAddr.district,
      city: newAddr.city,
      province: newAddr.province,
      country: newAddr.country,
      postal_code: newAddr.postal_code,
      created_by: employee.id,
      updated_by: employee.id,
    });
  },
  // update outlets_addresses
  updateOutletAddr: async (outletID, address, employeeID) => {
    // address is empty
    if (!address) {
      return;
    }
    // update address to db
    await outletsAddress.update(
      {
        street_name: address.street_name,
        district: address.district,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code,
        updated_at: new Date(),
        updated_by: employeeID,
      },
      {
        where: {
          id: outletID,
        },
      }
    );
  },
  
  deleteOutletAddr: async (req, res) => { },

  // supplier addrress
  getAllSuppAddr: async (req, res) => {
    res.json({
      msg: "all supp address",
    });
  },
  getSuppAddrByID: async (req, res) => {
    res.json({
      msg: "get addr by id",
    });
  },
  addSuppAddr: async (req, res) => {
    // export to addSupplier
  },
  updateSuppAddr: async (req, res) => {},
  deleteSuppAddr: async (req, res) => {},
};
