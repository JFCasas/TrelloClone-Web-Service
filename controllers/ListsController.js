let List = require('../models/List')
let Dashboard = require('../models/Dashboard')

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

	/*Dashboard.findOne({'_id':req.dashboard._id})

		.then((dashboard)=>{

			dashboard.lists.then((lists)=>{

				res.json(lists)
			
			})
		
		}).catch((err)=>{

			res.json(err)
		})*/
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

	List.findOne({slug:req.params.slug})

        .then((list) => {
        	//console.log(list)
        	list.remove()
        	res.json(list) 

        }).catch((err)=>{

			console.log(err)
			res.json(err)
	    })
}

function myTasks(req,res){

	List.findOne({'_id':req.list.id})

		.then((list)=>{

			//res.json(place)

			list.tasks.then((tasks)=>{

				res.json(tasks)
			
			})
		
		}).catch((err)=>{

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
	myTasks:myTasks
}