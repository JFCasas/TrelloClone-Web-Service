let List = require('../models/List')


function find(req,res,next){

	List.findOne({slug:req.params.slug})

		.then((doc)=>{

			req.list = doc
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

	List.find()

		.then((docs)=>{

			res.json(docs)
		
		}).catch((err)=>{

			console.log(err)
			res.json(err)
		})
}

function create(req,res){

	let listData = {};

	if (req.body.name) {listData["name"] = req.body.name }
    if (req.body._dashboard) {listData["_dashboard"] = req.body._dashboard }
	listData["_user"] = req.user.id
	

    List.create(listData).then((doc)=>{

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

	  res.json(req.list)
}



function destroy(req,res){

	//Eliminar un recurso

	List.findOneAndRemove({slug:req.params.slug})

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