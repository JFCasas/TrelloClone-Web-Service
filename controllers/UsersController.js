let User = require('../models/User')


function index(req,res){

	//Mostrar todos los recursos

	User.find()

		.then((docs)=>{

			res.json(docs)
		
		}).catch((err)=>{

			console.log(err)
			res.json(err)
		})
}

function create(req,res,next){

	User.create({

		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
		admin: req.body.admin


	}).then((doc)=>{

		req.user = doc;
		next()


	}).catch((err)=>{
		
		console.log(err)
		res.json(err)

	})
}

module.exports = {

	index:index,
	create:create
}