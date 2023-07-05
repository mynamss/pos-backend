const express = require("express");
const router = express();
const outlets = require("../controllers/outlets/outlets.controller");
const address = require("../controllers/address.controller");

const auth = require("../controllers/auth.controller");

// middlewares
const { runValidation, validateOutlet, validateUpdate } = require("../middlewares/validateType/validateOutlet");
const { verifyToken } = require("../middlewares");


// outlets data
router
  .route("/")
  // get all outlet
  .get(verifyToken, outlets.getAllOutlet)
  // add new outlet
  .post(verifyToken, [validateOutlet, runValidation], outlets.addOutlet);
router
  .route("/details/:id")
  // get outlet by id
  .get(verifyToken, outlets.getOutletByID)
  // update existing outlet
  .put(verifyToken, [validateUpdate, runValidation] ,outlets.updateOutlet)
  // delete existing outlet
  .delete(verifyToken, outlets.deleteOutlet);

// outlets address
router
  .route("/address")
  // get all outlet address
  .get(address.getAllOutletAddr);

router
  .route("/address/:id")
  // get address by id
  .get(address.getOutletAddrByID)
  // update existing address
  .put(address.updateOutletAddr)
  // delete existing address
  .delete(address.deleteOutletAddr);

module.exports = router;
