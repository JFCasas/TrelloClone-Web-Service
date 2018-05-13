let Dashboard = require('../models/Dashboard')


function find(req,res,next){

	Dashboard.findOne({slug:req.params.slug})

		.then((doc)=>{

			req.dashboard = doc
			req.mainObj = doc
			next()
		})

		.catch((err)=>{

			console.log(err)
			res.json(err)
		})


}

/*function prueba(req,res,next){

	console.log(req)
	next()
}*/



function index(req,res){

	//Mostrar todos los recursos

	//Place.find()

	Dashboard.find()

		.then((docs)=>{

			res.json(docs)
		
		}).catch((err)=>{

			console.log(err)
			res.json(err)
		})
}

function create(req,res){

	let dashboardData = {};

	if (req.body.name) {dashboardData["name"] = req.body.name }
    
	//dashboardData["_user"] = req.user.id

    Dashboard.create(dashboardData).then((doc)=>{

		res.json(doc)


	}).catch((err)=>{
		
		console.log(err)
		res.json(err)

	})
}

function show(req,res){

	//Mostrar un recurso

	/*Place.findById(req.params.id)

      .then((doc) => res.json(doc))
      .catch((err)=>{

			console.log(err)
			res.json(err)
	  })*/

	  res.json(req.dashboard)
}



function destroy(req,res){

	//Eliminar un recurso

	Dashboard.findOneAndRemove({slug:req.params.slug})

        .then(() => res.json({message: "El elemento se ha eliminado correctamente"}))
        .catch((err)=>{

			console.log(err)
			res.json(err)
	    })
}



module.exports = {
	//prueba:prueba,
	index:index,
	create:create,
	show:show,
	destroy:destroy,
	find:find,
}