const express = require('express');
const router = express.Router();



let dashboardsController = require('../controllers/DashboardsController');


router.route('/')

	.get(dashboardsController.index)

	.post(dashboardsController.create)



router.route('/:slug')

	.get(dashboardsController.find,dashboardsController.show)

	.delete(dashboardsController.find,dashboardsController.destroy)


module.exports = router;