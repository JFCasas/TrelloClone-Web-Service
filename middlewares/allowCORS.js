const expressUnless = require('express-unless');

module.exports = function(options){
  
  let CORsMiddleware = function(req,res,next){

    
    res.header("Access-Control-Allow-Origin", '*');

    res.header("Access-Control-Allow-Headers", 
    	"Origin, X-Requested-With, Content-Type, Accept, Authorization,Application");

    res.header("Access-Control-Allow-Methods", "DELETE,PUT")
    
    next();
  }

  CORsMiddleware.unless = expressUnless;

  return CORsMiddleware;
}