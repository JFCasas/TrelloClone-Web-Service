const mongoose = require("mongoose");

const slugify = require("../plugins/slugify")

const List = require("./List")

var Schema = mongoose.Schema;

var dashboardSchema = new Schema({

	name: {type:String, required:true},
	slug: {type:String, unique:true},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: "User",required:true}
	

});

dashboardSchema.virtual('lists').get(function(){

	return List.find({'_dashboard':this._id}).sort('-id')

		.then((lists)=>{

			return lists

			
		})

})

dashboardSchema.pre('save',function(next){

	this.slug = slugify(this.name)
	next()
})


//Definimos el modelo

let Dashboard = mongoose.model("Dashboard",dashboardSchema);

module.exports = Dashboard;
