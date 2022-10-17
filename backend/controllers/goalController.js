const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal.model");
const User = require("../models/user.model");

// @desc get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc create goals
// @route POST /api/goals
// @access Private
const createGoals = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add body");
  }
  const goal = await Goal.create({
    title: req.body.title,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoals = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // check if user is exist first
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  //Make sure login user match the id in goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ data: updatedGoals });
};

// @desc delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // check if user is exist first
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  //Make sure login user match the id in goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
};
