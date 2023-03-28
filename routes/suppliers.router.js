const express = require('express');
const router = express()
const suppliers = require("../controllers/suppliers/suppliers.controller")
const address = require("../controllers/address.controller");

// suppliers data
router
  .route("/")
  // get all supplier
  .get(suppliers.getAllSupplier)
  // add new supplier
  .post(suppliers.addSupplier);

router
  .route("/with/:id")
  // get supplier by id
  .get(suppliers.getSupplierByID)
  // update existing supplier
  .put(suppliers.updateSupplier)
  // delete existing supplier
  .delete(suppliers.deleteSupplier);

// suppliers address
router
  .route("/address")
  // get all supp address
  .get(address.getAllSuppAddr)

router
  .route("/address/:id")
  // get address by id
  .get(address.getSuppAddrByID)
  // update existing address
  .put(address.updateSuppAddr)
  // delete existing address
  .delete(address.deleteSuppAddr);

module.exports = router;