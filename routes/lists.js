const express = require('express');
const router = express.Router();



let listsController = require('../controllers/ListsController');

const authenticateOwner = require('../middlewares/authenticateOwner');


router.route('/')

	.get(listsController.index)

	.post(listsController.create)



router.route('/:slug')

	.get(listsController.find,listsController.show)

	.delete(
		listsController.find,
		authenticateOwner,
		listsController.destroy
		)


module.exports = router;