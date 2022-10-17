const express = require('express');
const router = express.Router();
const {getGoals, createGoals, updateGoals, deleteGoals} = require("../controllers/goalController")
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, createGoals);
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;