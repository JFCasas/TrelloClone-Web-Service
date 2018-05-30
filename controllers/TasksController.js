let Task = require('../models/Task')
let List = require('../models/List')


function find(req,res,next){

	Task.findOne({slug:req.params.slug})

		.then((doc)=>{

			req.task = doc
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

	Task.find()

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

	let taskData = {};

	if (req.body.name) {taskData["name"] = req.body.name }
    if (req.body._dashboard) {taskData["_dashboard"] = req.body._dashboard }
    if (req.body._list) {taskData["_list"] = req.body._list }
	taskData["_user"] = req.user.id
	

    Task.create(taskData).then((doc)=>{

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

	  res.json(req.task)
}

function update(req,res){

	//Actualizar un recurso

	let taskData = {};

	if (req.body.name) {taskData["name"] = req.body.name }
    if (req.body._dashboard) {taskData["_dashboard"] = req.body._dashboard }
    if (req.body._list) {taskData["_list"] = req.body._list }
    
    Task.findOne({slug:req.params.slug})

      .then((task) => {

			  task.set(taskData);
			  
			  task.save((err, updatedDoc) => {
			    
			    if (err){

			    	console.log(err)
			    	res.json(err)

			    } 
			    res.json(updatedDoc)
			  });

		})
      
        .catch((err)=>{

			console.log(err)
			res.json(err)
	    })
}



function destroy(req,res){

	//Eliminar un recurso

	

	Task.findOne({slug:req.params.slug})

        .then((task) => {

        	task.remove()
        	res.json(task) 

        }).catch((err)=>{

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
	update:update
}