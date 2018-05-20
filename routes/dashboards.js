const express = require('express');
const router = express.Router();



let dashboardsController = require('../controllers/DashboardsController');

const authenticateOwner = require('../middlewares/authenticateOwner');


router.route('/')

	.get(dashboardsController.index)

	.post(dashboardsController.create)



router.route('/:slug')

	.get(dashboardsController.find,dashboardsController.show)

	.delete(
		dashboardsController.find,
		authenticateOwner,
		dashboardsController.destroy
		)

router.route('/:slug/lists')

	.get(

		dashboardsController.find,
		dashboardsController.myLists
		
		)




module.exports = router;