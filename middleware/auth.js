//middleware is just a function that has access to req and respons cycle and req and res object
//everytime we hit an endpoint we we can fire the middleware   
//and we just want to check and see if their is a token in the head


const jwt= require('jsonwebtoken');                                         //we send a string of  jwt to users when they login or sign uo so that tehy can access proected routes
const config =require('config');                                             //to bring in the jwtsecret in here from the defaultjson



//middleware function , we check to see first if their is a token in the header, iftheir is a token we verify and then we pull out the payload we are going to setthe user to res.user so that we have access to it inside the route

module.exports =function(req, res ,next) {                     //it takes in next  because in a middleware function it is like do wj=hat you want to do but then trigger the next piece of middleware
  //get token from header
  const token =req.header('x-auth-token');                  //the    x-auth-token is the key for the token inside the header

  //check if not token
  if(!token){
    return res.status(401).json({msg: 'No Token , Authorization denied'});
  }

  try{
    const decoded = jwt.verify(token , config,get('jwtsecret'));       //pass in the token , we have the token but we need to verfy, and it aslo takes in the secret...... onceit gets verified  the user object gets put into decoded

    req.user =decoded.user;                    //decoded is the entire token payload but we only want the user
    next();

  } catch(err){
    res.status(401).json({msg: ' Token is not valid'});
  }
}