//authentication and to check the user
                  //two routes    --get the logged in user and get the token for the user logging in ,which means logging in the user

const express = require('express');
const router = express.Router();

const bcrypt =require('bcryptjs');
const jwt= require('jsonwebtoken');                                         //we send a string of  jwt to users when they login or sign uo so that tehy can access proected routes
const config =require('config');                                             //to bring in the jwtsecret in here from the defaultjson

const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');


const User = require('../models/User');                     











// @route    GET api/auth         
// @desc     Get the logged in user               
// @access   PRIVATE                                                                                 //so this is the private route that we need to protect, everytime we need to protect a route we need to bring in the middleware              
router.get('/', auth ,async (req, res ) => {                  //as we need to make it a protected route , we jyst pass  the auth  middleware as second parameter
              //as we include auth in the parameter we tell to go through the middleware, and it runs itself
    try{
      const user= await User.findById(req.user.id).select('-password');          //mongoose method that returns promise    --if we send coorrect token then we logged in then the request oject will have a user login attached to it with the current loggedin useres id   //we dont want to return the encrypted password so we do the select()
      res.json(user);                                                                    
    } catch(err) { 
      console.error(err.message);
      res.status(500).send('server error');

    }//so works when you have been authorized by the middleware that the credentials you entered is correct
          
}); 












// @route    POST api/auth                      //sending data to this to get authenticated  through api/auth
// @desc     Auth user and get token
// @access   PUBLIC                              //purpose is to auth user and get the token so that user can access privates routes
router.post('/', [
    check('email','please include a valid email').isEmail(),
    check('password','please enter a valid password').exists()
], 
  async (req, res ) => {  
    const errors = validationResult(req);                         //we only do this routes that accept data and need va;idation            //and we pass in the request which has the data filled and we pass it through the checkervalidator and that is given to error
    if(!errors.isEmpty()){                                         //if errors are not empty  //then
      return res.status(400).json({errors: errors.array() });              //we are returning the status that their is a fault  and with that we are also sending the json data  in which  -- errors: errors.array    so that is a method which gives us an array of errors
    }
    
    const { email, password} = req.body;           //destructure

    try{
      let user =await User.findOne({ email });

      if(!user){
        return res.status(400).json({msg: 'invalid credentials'});
      };

      const ismatch = await bcrypt.compare(password, user.password );           //now we see into the password with the bcrypt.compare METHOD , and first we put in our password and then our hash password whihc is the user that was found in the db
      if(!ismatch){
        return res.status(400).json({msg: 'invalid credentials ' });
      }
      //now if password does match then we will do exactly as done before , we send a token/....
   //sending JWT
      const payload ={
        user: {
            id: user.id            
        }
      }                                          

      jwt.sign(payload, config.get('jwtsecret'), 
              {expiresIn: 360000}                  
          ,(err , token) => {                  
              if(err) throw err;
              res.json({ token });               
        });             

    } catch (err){                               
      console.error(err.message);  
      res.status(500).send('server error');      
    }                      

  // res.send('Log in User');             
}); 






module.exports = router;