const express = require('express');
const router = express()

const leave = require('../controllers/employees/leave.controller');

// route grouping
router
  .route("/")
  // get all leave
  .get(leave.getAllLeave)
  // add new role
  .post(leave.addLeave);

router
  .route("/details")
  // get leave by id employee
    // access with token
  .get(leave.getLeaveByID)
  // update / edit existing role
  .put(leave.updateLeave)
  // delete existing role
  .delete(leave.deleteLeave);




module.exports= router