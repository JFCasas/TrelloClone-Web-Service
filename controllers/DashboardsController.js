let Dashboard = require('../models/Dashboard')
let User = require('../models/User')


function find(req,res,next){

	Dashboard.findOne({slug:req.params.slug})

		.then((doc)=>{

			

			req.dashboard = doc
			//console.log(req.dashboard)
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

	//console.log(req.user.id)

	/*Dashboard.find()

		.then((docs)=>{

			res.json(docs)
		
		}).catch((err)=>{

			console.log(err)
			res.json(err)
		})*/

	User.findOne({'_id':req.user.id})

		.then((user)=>{

			user.boards.then((boards)=>{

				res.json(boards)
			
			})
		
		}).catch((err)=>{

			res.json(err)
		})
}

function create(req,res){

	let dashboardData = {};

	if (req.body.name) {dashboardData["name"] = req.body.name }
    
	dashboardData["_user"] = req.user.id

    Dashboard.create(dashboardData).then((doc)=>{

		res.json({'success':true,doc})


	}).catch((err)=>{
		
		console.log(err)
		res.json({'success':false, 'message':'Some Error Happened'} )

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



/*function destroy(req,res){

	//Eliminar un recurso

	Dashboard.findOneAndRemove({slug:req.params.slug})

        .then(() => res.json({message: "El elemento se ha eliminado correctamente"}))
        .catch((err)=>{

			console.log(err)
			res.json(err)
	    })
}*/

function destroy(req,res){

	//Eliminar un recurso

	Dashboard.findOne({slug:req.params.slug})

        .then((dashboard) => {

        	dashboard.remove()
        	res.json(dashboard) 

        }).catch((err)=>{

			console.log(err)
			res.json(err)
	    })
        
        
}

function myLists(req,res){

	Dashboard.findOne({'_id':req.dashboard.id})

		.then((dashboard)=>{

			//res.json(place)

			dashboard.lists.then((lists)=>{

				res.json(lists)
			
			})
		
		}).catch((err)=>{

			res.json(err)
		})
}

function myTasks(req,res){

	Dashboard.findOne({'_id':req.dashboard.id})

		.then((dashboard)=>{

			//res.json(place)

			dashboard.tasks.then((tasks)=>{

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
	myLists:myLists,
	myTasks:myTasks
}