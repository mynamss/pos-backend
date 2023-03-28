const models = require("../models");
const { employeesAddress, outletsAddress, suppliersAddress } = models;

module.exports = {
    // employee address
    getAllEmpAddr: async (req, res) => {
        res.json({
            "msg": "all emp address"
        })
    },
    getEmpAddrByID: async (req, res) => {
        res.json({
            "msg": "emp address by id"
        })
    },
    addEmpAddr: async (req, res) => {
        // export to registerEmployee
    },
    updateEmpAddr: async (req, res) => {

    },
    deleteEmpAddr: async (req, res) => {

    },
    
    // outlets address
    getAllOutletAddr: async (req, res) => {
        // console.log("Masuk outlet address");
        res.json({
            "msg": "all outlet address"
        })
    },
    getOutletAddrByID: async (req, res) => {
        res.json({
            "msg": "outlet address by id"
        })
    },
    addOutletAddr: async (req, res) => {
        // export to addOutlet
    },
    updateOutletAddr: async (req, res) => {

    },
    deleteOutletAddr: async (req, res) => {

    },

    // supplier addrress
    getAllSuppAddr: async (req, res) => {
        res.json({
            "msg": "all supp address"
        })
    },
    getSuppAddrByID: async (req, res) => {
        res.json({
            "msg": "get addr by id"
          })
    },
    addSuppAddr: async (req, res) => {
        // export to addSupplier
    },
    updateSuppAddr: async (req, res) => {

    },
    deleteSuppAddr: async (req, res) => {

    },
    

}