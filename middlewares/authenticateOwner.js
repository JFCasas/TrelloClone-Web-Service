module.exports = (req,res,next)=>{

	if ( req.mainObj && (req.mainObj._user == req.user.id)){

		return next()
	}

	next(new Error('You have bo permissions to be here'))
}