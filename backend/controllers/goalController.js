const asyncHandler = require('express-async-handler')

// @desc	Get goals
// @route	GET /api/goals
// @access	Private
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({'message': 'Get Goals'});
})

// @desc	Get goal by id
// @route	GET /api/goals/:id
// @access	Private
const getGoal = asyncHandler(async (req, res) => {
	res.status(200).json({'message': `Get goal with id: ${req.params.id}`});
})

// @desc	Set goal
// @route	POST /api/goals
// @access	Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400); //.json({'message': 'Please add a text field'});
		throw new Error('Please add a text field');
	}
	res.status(200).json({'message': 'Set Goal'});
})

// @desc	Update goal by id
// @route	PUT /api/goals/:id
// @access	Private
const updateGoal = asyncHandler(async (req, res) => {
	res.status(200).json({'message': `Update goal with id: ${req.params.id}`});
})

// @desc	Delete goal by id
// @route	DELETE /api/goals/:id
// @access	Private
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({'message': `Delete goal with id: ${req.params.id}`});
})

module.exports = {
	getGoals, getGoal, setGoal, updateGoal, deleteGoal
}