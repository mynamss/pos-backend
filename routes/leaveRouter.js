const express = require('express');
const router = express()

const {getAllLeave, getLeaveByID, addLeave, updateLeave, deleteLeave} = require('../controllers/employees/leaveController');
router.get('/', getAllLeave)
router.get('/:id', getLeaveByID)
router.post('/', addLeave)
router.put('/', updateLeave)
router.delete('/', deleteLeave)




module.exports= router