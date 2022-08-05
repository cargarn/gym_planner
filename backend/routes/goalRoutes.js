const express = require('express')
const router = express.Router()
const { getGoals, getGoal, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

router.get('/', getGoals)
router.post('/', setGoal)
router.get('/:id', getGoal)
router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)

module.exports = router