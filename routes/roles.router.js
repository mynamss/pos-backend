const express = require("express");
const router = express();

const roles = require("../controllers/employees/roles.controller");

// route grouping
router
  .route("/")
  // get all roles
  .get(roles.getAllRole)
  // add new role
  .post(roles.addRole);

router
  .route("/:id")
  // get roles by id
  .get(roles.getRoleByID)
  // update / edit existing role
  .put(roles.updateRole)
  // delete existing role
  .delete(roles.deleteRole);

router.delete("/delete/all", roles.deleteAllRole)

module.exports = router;
