//register route


const express = require('express');
const router = express.Router();
const bcrypt =require('bcryptjs');
const jwt= require('jsonwebtoken');                                         //we send a string of  jwt to users when they login or sign uo so that tehy can access proected routes
const config =require('config');                                             //to bring in the jwtsecret in here from the defaultjson

const { check, validationResult } = require('express-validator/check');


const User = require('../models/User');                      //now we will make the body of our route.and as we have imported the user model in here           //now before that do some error checking






// @route    POST api/users                                                                             //now for eveyry request we are having signatures the above coments   --  the end oit we are hitting on in post request is api/users
// @desc     REGISTER a user
// @access   PUBLIC

router.post('/', [                             //in this [] we put checks on paameters, like we did below
        check('name', 'name is required')
            .not()
            .isEmpty(),         //this will make sure that name entered is not empty
        check('email', 'please enclude a valid email')
            .isEmail(),
        check('password' , 'please enter a password with 6 or more charachters')
            .isLength({ min:6 })
    ],

    async (req, res ) => {                                                         //we are doing the post request   //http request is initialised here like this                                               //now here / is equal to pertains to ----   api/users                  ,,because we wrote in the app.use in the server.js
      

    const errors = validationResult(req);                         //we only do this routes that accept data and need va;idation            //and we pass in the request which has the data filled and we pass it through the checkervalidator and that is given to error
    if(!errors.isEmpty()){                                         //if errors are not empty  //then
      return res.status(400).json({errors: errors.array() })              //we are returning the status that their is a fault  and with that we are also sending the json data  in which  -- errors: errors.array    so that is a method which gives us an array of errors
    }
      


    const { name, email, password}  =req.body;             //destructuring the data incoming  



    try{                                                                                //decrypt methods which also returns promises

        let user = await User.findOne({email: email});                  //finding if user already exists.. here we take USER MODEL and with mongoose method which is FINDONE 

        if(user){
            return res.status(400).json({msg:'User already exists'});                     //so we get bad request and msg gets displayed
        }

        user = new User({                            //if user dosent exist then -- create a new user and that has been created with USER MODEL and it isnt saved in db but is like new user and exist
            name,
            email,
            password: password
        });
        //before saving in db we have to encrypt the password by hash
        const salt = await bcrypt.genSalt(10)                                        //it would generate a salt and creates a promise   //gensalt is a method which hashes
        user.password = await bcrypt.hash(password, salt);                                            //bcrypt.hash method also return a promise     //this takes in two things -- normal text password and the salt -- and generates a hash for the apssword
    
        await user.save();                                   //this save mathod also returns a promise

        //res.send('user saved');               //this is send if correct promise is executed else we send error            //now this is just testing ,to see if user actually gets put in db,, otherwise we will be sendning in the jwt
      

   //sending JWT
        const payload ={
          user: {
              id: user.id                     //this is it i want to send to user. with this id  logged in user can access all the contacts
          }
        }                                                                       //payload is the objct i want to send which is the 

        jwt.sign(payload, config.get('jwtsecret'), {                                                 //first it takes the payload, then jwt secret and it should be put in some config  ,,and next is an object of options ,in his objects we can put expires in
                expiresIn: 360000                                                    //so gets destriyed in an hr and they can log back in
            }, (err , token) => {                                                                              //next parameter is an callback function with error and tokken itself
                if(err) throw err;
                res.json({ token });                        //so this sends back the token which carries the logged in user id and if we put the token in jwt.io we get the initialised at and expired at date.                //
            });               //token has users id ,,, so what we do is create a middleware and that extracts the users id by the token and then we do whatever with that id         
    
    
    } catch (err){                               //for error
        console.log(err.message);  
        res.status(500).send('server error');       //notifies server error
    }                      








    //res.send('passed');                                         //this will be send if only their is no error being returned         
    
    
    //res.send(req.body);          ----------------------------         //now it will send the email,password the name that is req for register.. to access this we will have to need to use a middlewear                           
    //now we want to limit what can be sent and ensure that somethings are sent                      
        //EXPRESS.VALIDATOR                  -- with this we can set checks -- on certain parameters       like on email we can .isEmail()  or .isLength({ min:5 })                               just bring in ---->>>>>  const { check, validationResult } = require('express-validator/check');                                                                    
});                                                                                                                                                                                  //different methods to use from  other packages can be used   ,, other custome validations can be used




module.exports = router;