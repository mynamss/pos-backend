const express = require("express");
const router = express();

const { getAllRole, addRole, updateRole, deleteRole, getRoleByCode } = require("../controllers/employees/rolesController");

router.get("/", getAllRole);
router.get("/:rolecode", getRoleByCode);
router.post("/", addRole);
router.put("/", updateRole);
router.delete("/", deleteRole);

module.exports = router;
