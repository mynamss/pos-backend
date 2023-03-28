const express = require("express");
const router = express();
const outlets = require("../controllers/outlets/outlets.controller");
const address = require("../controllers/address.controller");

// outlets data
router
  .route("/")
  // get all outlet
  .get(outlets.getAllOutlet)
  // add new outlet
  .post(outlets.addOutlet);

router
  .route("/with/:id")
  // get outlet by id
  .get(outlets.getOutletByID)
  // update existing outlet
  .put(outlets.updateOutlet)
  // delete existing outlet
  .delete(outlets.deleteOutlet);

// outlets address
router
  .route("/address")
  // get all outlet address
  .get(address.getAllOutletAddr)

router
  .route("/address/:id")
  // get address by id
  .get(address.getOutletAddrByID)
  // update existing address
  .put(address.updateOutletAddr)
  // delete existing address
  .delete(address.deleteOutletAddr);

module.exports = router;
