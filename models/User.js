const mongoose = require("mongoose");

const mongooseBcrypt = require("mongoose-bcrypt")

const Dashboard = require("./Dashboard")

let Schema = mongoose.Schema;

let userSchema = new Schema({

	email: {type:String, required:true,unique:true},
	name : String,
	admin: {type:Boolean, default: false},
	

});

userSchema.plugin(mongooseBcrypt)

userSchema.virtual('boards').get(function(){

	return Dashboard.find({'_user':this._id})
})


//Definimos el modelo

let User = mongoose.model("User",userSchema);

module.exports = User;
