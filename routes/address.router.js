const express = require("express");
const router = express();

const address = require("../controllers/address.controller");

// employee address
router
  .route("/")
  // get all address
  .get(address.getAllEmpAddr);

router
  .route("/:id")
  // get address by id
  .get(address.getEmpAddrByID)
  // update existing address
  .put(address.updateEmpAddr)
  // delete existing address
  .delete(address.deleteEmpAddr);



module.exports = router;
