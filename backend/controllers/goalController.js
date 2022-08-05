const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc	Get goals
// @route	GET /api/goals
// @access	Private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({});

	res.status(200).json(goals);
})

// @desc	Get goal by id
// @route	GET /api/goals/:id
// @access	Private
const getGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Goal not found');
	}
	res.status(200).json(goal);
})

// @desc	Set goal
// @route	POST /api/goals
// @access	Private
const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400); //.json({'message': 'Please add a text field'});
		throw new Error('Please add a text field');
	}

	const goal = await Goal.create({
		text: req.body.text,
	});
	res.status(200).json(goal);
})

// @desc	Update goal by id
// @route	PUT /api/goals/:id
// @access	Private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Goal not found');
	}
	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});
	res.status(200).json(updatedGoal);
})

// @desc	Delete goal by id
// @route	DELETE /api/goals/:id
// @access	Private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Goal to be deleted not found');
	}
	await goal.remove();
	res.status(200).json({id: req.params.id});
})

module.exports = {
	getGoals, getGoal, setGoal, updateGoal, deleteGoal
}