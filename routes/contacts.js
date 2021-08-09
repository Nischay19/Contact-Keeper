//crud functionality, create update and delete
//if no contact then it should be giving back an empty array,also get validation checker

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');                                                           //was for authenticating the users token assigned and give back the user in req header
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');                      //now we will make the body of our route.and as we have imported the user model in here           //now before that do some error checking
const Contact = require('../models/Contact');








//1
// @route    GET api/contacts                      
// @desc     Get all users contact
// @access   Private                      //protected route so add auth as parameter          //because you have to be logged in
router.get('/', auth ,async (req, res ) => {                   //dealing with mongoose and it has promises
  try{
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1});        //conracts have a user field which is userid, so we need to get the contacts for this user so by auth middleware  we have access to req.user  object    //now we sorted so that we get the most recent contacts      //now we have contacts array
    res.json(contacts);                                                                   //if no contact then it should be giving back an empty array,,,, once we enter et request and also the token and x-auth-token in header that because this is a protected route through auth
  } catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  } 
  // res.send('Get all contacts');       //bakvas
}); 











//2
// @route    POST api/contacts                      
// @desc     Add new contact
// @access   Private                                 //this is also a private route so use auth in parameter and mention tokens in header//////////////// we are alos going to use express validator      
router.post('/', [auth,[
    check('name', 'name is required')
      .not()
      .isEmpty()
    ] 
  ],  
   async (req, res ) => { 
    const errors = validationResult(req);                                                            //we only do this routes that accept data and need va;idation            //and we pass in the request which has the data filled and we pass it through the checkervalidator and that is given to error
    if(!errors.isEmpty()) {                                                                            //if errors are not empty  //then
      return res.status(400).json({errors: errors.array() });                                                 //we are returning the status that their is a fault  and with that we are also sending the json data  in which  -- errors: errors.array    so that is a method which gives us an array of errors
    }



    const {name, email, phone ,type } = req.body;              //take out the stuff from body and destructure
    
    try{
      const newContact =new Contact({                             //this is a class we are making to initialize he cntacts objects
        name,
        email,
        phone,
        type,
        user: req.user.id                              //as we are using auth middleware so we have acces to the user object
      });
      const contact = await newContact.save();                                  //so use newContact because we want to save it the database
      res.json(contact);                                     //now the new contact which have the new cintact just added above will be returned to the client
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
    
    
    // res.send('Add contacts');       
}); 









//3
// @route    PUT api/contacts/:id                     //id is for selecting which contact with the id you want to update                
// @desc     update contact
// @access   Private                         
router.put('/:id',auth, async (req, res ) => {   
  
  const {name, email, phone ,type } = req.body;              //take out the stuff from body and destructure
  
  //build a contact object, basedon the fields we have submitted
  const contactFields ={};
  if(name) contactFields.name =name;
  if(email) contactFields.email =email;
  if(phone) contactFields.phone =phone;
  if(type) contactFields.type =type;

  try{
    let contact = await Contact.findById(req.params.id);                             //now the way we access params like this is this--,,   and we also have a /:id in the parameter so that need s to be accessed here 
    if(!contact){ return res.status(404).json({ msg : 'contact not found'})};        //so thier is no contact

    
  //make sure user owns contact   // contact .user is compared to the user from the token        //now we want to make sure that the route is rotected and we want that someone only changes his or her contact
    if(contact.user.toString() !== req.user.id) {    //protect the contacts 
      return res.status(401).json({msg: 'not authorized wtf'});
    }

  //now updating the contacts and selecting which contact to update by contact id
    contact= await Contact.findByIdAndUpdate(req.params.id,                  // -- req.params.id that is the contact id
    {$set : contactFields },
    { new : true});

    res.json(contact);                         //we are sending along the updated contact


  } catch(err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
  
  // res.send('upadate contacts');       
}); 













//4
// @route    DELETE api/contacts/:id                     //id is for selecting which contact with the id you want to update                
// @desc     delete contact
// @access   Private                         
router.delete('/:id', auth, async(req, res ) => {   
  
  
  
  
  try{
    let contact = await Contact.findById(req.params.id);                             //now the way we access params like this is this--,,   and we also have a /:id in the parameter so that need s to be accessed here 
    if(!contact){ return res.status(404).json({ msg : 'contact not found'})};        //so thier is no contact
 
  //make sure user owns contact   // contact .user is compared to the user from the token        //now we want to make sure that the route is rotected and we want that someone only changes his or her contact
    if(contact.user.toString() !== req.user.id) {    //protect the contacts 
      return res.status(401).json({msg: 'not authorized wtf'});
    }

  //now updating the contacts and selecting which contact to update by contact id
    await Contact.findByIdAndRemove(req.params.id);                     //dont use deletebecause that is deprecated and use this

    res.json({msg : 'contact removed'});                         //we are sending along the updated contact

  } catch(err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
     
}); 




module.exports = router;