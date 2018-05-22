const mongoose = require("mongoose");

const slugify = require("../plugins/slugify")

const Task = require("./Task")

var Schema = mongoose.Schema;

var listSchema = new Schema({

	name: {type:String, required:true},
	slug: {type:String, unique:true},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: "User",required:true},
	_dashboard: {type: mongoose.Schema.Types.ObjectId, ref: "Dashboard",required:true}
	

});

listSchema.pre('save',function(next){

	this.slug = slugify(this.name)
	next()
})

listSchema.virtual('tasks').get(function(){

	return Task.find({'_list':this._id}).sort('-id')

		.then((tasks)=>{

			return tasks

		})

})


//Definimos el modelo

let List = mongoose.model("List",listSchema);

module.exports = List;