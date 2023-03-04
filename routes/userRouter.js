const express = require("express");
const router = express();


router.get('/:id/employee', (req, res) => {
    res.send("Employees")
})

module.exports = router;
