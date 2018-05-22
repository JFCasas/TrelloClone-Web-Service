const mongoose = require("mongoose");

const slugify = require("../plugins/slugify")

var Schema = mongoose.Schema;

var taskSchema = new Schema({

	name: {type:String, required:true},
	slug: {type:String, unique:true},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: "User",required:true},
	_dashboard: {type: mongoose.Schema.Types.ObjectId, ref: "Dashboard",required:true},
	_list: {type: mongoose.Schema.Types.ObjectId, ref: "List",required:true},
	done: {type:Boolean, default: false} 

});

taskSchema.pre('save',function(next){

	this.slug = slugify(this.name)
	next()
})


//Definimos el modelo

let Task = mongoose.model("Task",taskSchema);

module.exports = Task;