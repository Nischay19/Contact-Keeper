//authentication and to check the user
                  //two routes    --get the logged in user and get the token for the user logging in ,which means logging in the user

const express = require('express');
const router = express.Router();


// @route    GET api/auth         
// @desc     Get the logged in user
// @access   PRIVATE
router.get('/', (req, res ) => {   
    res.send('Get logged in user');    
          
}); 




// @route    POST api/auth                      //sending data to this to get authenticated  through api/auth
// @desc     Auth user and get token
// @access   PUBLIC                              //purpose is to auth user and get the token so that user can access privates routes
router.post('/', (req, res ) => {   
  res.send('Log in User');    
        
}); 




module.exports = router;