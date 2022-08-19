const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

// @desc	Get users
// @route	GET /api/users
// @access	Private
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});

	res.status(200).json(users);
})

// @desc	Get user by id
// @route	GET /api/users/:id
// @access	Private
const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(400);
		throw new Error('User not found');
	}
	res.status(200).json(user);
})

// @desc	Set user
// @route	POST /api/users
// @access	Private
const setUser = asyncHandler(async (req, res) => {
	if (!req.body.username) {
		res.status(400); //.json({'message': 'Please add a username field'});
		throw new Error('Please add a username field');
	}

	const user = await User.create(req.body);
	res.status(200).json(user);
})

// @desc	Update user by id
// @route	PUT /api/users/:id
// @access	Private
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(400);
		throw new Error('User not found');
	}
	const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
	res.status(200).json(updatedUser);
})

// @desc	Delete user by id
// @route	DELETE /api/users/:id
// @access	Private
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(400);
		throw new Error('User to be deleted not found');
	}
	await user.remove();
	res.status(200).json({id: req.params.id});
})

module.exports = {
	getUsers, getUser, setUser, updateUser, deleteUser
}