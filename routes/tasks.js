const express = require('express');
const router = express.Router();



let tasksController = require('../controllers/TasksController');

const authenticateOwner = require('../middlewares/authenticateOwner');


router.route('/')

	.get(tasksController.index)

	.post(tasksController.create)



router.route('/:slug')

	.get(tasksController.find,tasksController.show)

	.put(
		tasksController.find,
		authenticateOwner,
		tasksController.update
		)

	.delete(
		tasksController.find,
		authenticateOwner,
		tasksController.destroy
		)


module.exports = router;