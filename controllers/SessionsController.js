const jwt = require('jsonwebtoken')

const jwtSecret = 'dfhwgfreufewhfgdhgrehgehgrmenteehrhg'

const User = require('../models/User')




function generateToken(req,res,next){

	if(!req.user) return next()

	req.token = jwt.sign({id:req.user._id},jwtSecret)

	next()

}

function sendToken(req,res){

	if (req.user){

		res.json({

			user: req.user,
			jwt: req.token
		})
	
	}else{

		res.status(422).json({

			error: "Could not create user"
		})
	}


}

function authenticate(req,res,next){

	User.findOne({email:req.body.email})

		.then((user)=>{

			user.verifyPassword(req.body.password)

				.then((valid)=>{

					if(valid){

						req.user = user
						next()
					
					}else{

						next(new Error('Invalid credentials'))
					}


				})

		}).catch((error)=>{

			next(error)
		})


}



module.exports = {

	generateToken,
	sendToken,
	authenticate
}