const mongoose = require("mongoose");

const slugify = require("../plugins/slugify")

var Schema = mongoose.Schema;

var dashboardSchema = new Schema({

	name: {type:String, required:true},
	slug: {type:String, unique:true}
	

});

dashboardSchema.pre('save',function(next){

	this.slug = slugify(this.name)
	next()
})


//Definimos el modelo

let Dashboard = mongoose.model("Dashboard",dashboardSchema);

module.exports = Dashboard;
