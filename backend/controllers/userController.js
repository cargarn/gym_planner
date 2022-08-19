const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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

// @desc	Get user data
// @route	GET /api/users/me
// @access	Private
const getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(400);
		throw new Error('User not found');
	}
	res.status(200).json(user);
})

// @desc	Authenticate a user
// @route	POST /api/users/login
// @access	Private
const loginUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body;

	// Check for user email
	const user = await User.findOne({email})

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(201).json({
			_id: user.id,
			username: user.username,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
})

// @desc	Set user
// @route	POST /api/users
// @access	Private
const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = request.body;
	if (!username || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	// Check if user exists
	const userExists = await User.findeOne({email});
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		username,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			username: user.username,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
	
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


// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d', // 30 days
	});
}

module.exports = {
	getUsers, loginUser, getMe, getUser, registerUser, updateUser, deleteUser
}