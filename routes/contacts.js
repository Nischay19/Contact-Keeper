//crud functionality, create update and delete


const express = require('express');
const router = express.Router();



//1
// @route    GET api/contacts                      
// @desc     Get all users contact
// @access   Private                         //because you have to be logged in
router.get('/', (req, res ) => {   
  res.send('Get all contacts');       
}); 


//2
// @route    POST api/contacts                      
// @desc     Add new contact
// @access   Private                         
router.post('/', (req, res ) => {   
  res.send('Add contacts');       
}); 


//3
// @route    PUT api/contacts/:id                     //id is for selecting which contact with the id you want to update                
// @desc     update contact
// @access   Private                         
router.put('/:id', (req, res ) => {   
  res.send('upadate contacts');       
}); 


//4
// @route    DELETE api/contacts/:id                     //id is for selecting which contact with the id you want to update                
// @desc     delete contact
// @access   Private                         
router.delete('/:id', (req, res ) => {   
  res.send('delete contacts');       
}); 




module.exports = router;