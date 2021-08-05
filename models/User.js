const mongoose = require('mongoose');



const UserSchema =mongoose.Schema({                        //we are creating a userschema that what type of data should be sent in the request to be entered in the database      //User is like class constructor
  name: {
    type:String,
    required: true
  },  
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default:Date.now
  }
});



module.exports = mongoose.model( 'user' , UserSchema);                //so parameters of   model   are the user model and the userschema that we just created above