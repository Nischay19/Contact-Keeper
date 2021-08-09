const mongoose = require('mongoose');



const ContactSchema =mongoose.Schema({                            //we are creating a userschema that what type of data should be sent in the request to be entered in the database      //User is like class constructor
  user: {                                      //we need to add a value here to link contact and users -- every user has different list of contacts
    type: mongoose.Schema.Types.ObjectId,              //when we cretate   entries with mongodb,the document has an object id/..///  now we next need to refer a single collection of ids that is users
    ref: 'users'
  },
  name: {
    type:String,
    required: true
  },  
  email: {
    type: String,
    required: true,
    // unique:true         //dosent have to be unique because it is just contacts being stored so anyways
  },
  phone: {
    type: String,
    // required: true
  },
  type: {
    type: String,
    default: 'personal'             //personal or proffesional???
  },
  date: {
    type: Date,
    default:Date.now
  }
});



module.exports = mongoose.model( 'contact' , ContactSchema);                //so parameters of   model   are the user model and the userschema that we just created above