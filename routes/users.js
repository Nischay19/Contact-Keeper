//register route

const express = require('express');
const router = express.Router();


// @route    POST api/users                                                                             //now for eveyry request we are having signatures the above coments   --  the end oit we are hitting on in post request is api/users
// @desc     REGISTER a user
// @access   PUBLIC
router.post('/', (req, res ) => {                       //we are doing the post request one of the 4 main methods  //http request is initialised here like this              
    res.send('Register a user');                                                          //now here / is equal to pertains to ----   api/users                  ,,because we wrote in the app.use in the server.js
          
}); 


module.exports = router