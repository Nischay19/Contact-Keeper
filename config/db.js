const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;



















//basically the default.json helps to hide what we want to hide from code so fir that we use config module and also in the default.json we can use the object as global environmental variable....//






































// const mongoose =require('mongoose');                   //our  mongoURI is the connection strijng 
// const config = require('default');                 //because we need access to global variable in default.json    //so bring in config
// const db = config.get('mongoURI');                   //to grab the value of the global variable


//                                                 //mongoose actually returns promises and so we can do by both method by promises or async await
// const connectDB = async () => {
//   try {
//     await mongoose.connect(db,{
//       useNewUrlParser: true,                   //these are parameter to avoid some warnings in mongoose console. so these may not be required in the latest version of mongoose
//       useCreateIndex: true,
//       useFindAndModify: false 
//     });
//     console.log('mongodb connected')
//   }catch (err) {
//     console.error(err.message);                                                     //catching errors
//     process.exit(1);                           //this will exit with failure  // when we exit and put in 1 in parameter
//   }
// };



//   // mongoose.connect(db,{
//   //     // useNewUrlParser: true,                   //these are parameter to avoid some warnings in mongoose console. so these may not be required in the latest version of mongoose
//   //     // useCreateIndex: true,
//   //     // useFindAndModify: false 
  
//   //   }).then(() => console.log('mongodb connected '))                                                     //so we use a promise here
//   //     .catch((err) => {
//   //       console.log(err.message);                                                     //catching errors
//   //       process.exit(1);                 //this will exit with failure  // when we exit and put in 1 in parameter
//   //     });




// module.exports = connectDB;