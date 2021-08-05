//entry point to our backend                 //torun the server type --   npm run server

const express = require('express');                //very basic express server     //bring in express              //we cant use import unless we install babel/typescript. otherwise we use this syntax to bring in modules which is called common js
const connectDB = require('./config/db');

const app =express();


//connect database
connectDB();


//INIT MIDDLEWARE
app.use(express.json({ extended: false}));                      //to accept jsondata     ,, so nowby doing this we can accept the  body data 


app.get('/', (req,res) => res.json({msg: 'Welcome to the contactkeeper json api'}));              //so we can use res.send   or res.json(use because it is a json api)                //now this takes an arrow function with a request and response as params and before that a url

                                          //with the nodemon we can start the backend sever and   --    npm run server  --  in the terminal
                                          //rn with this much code the localhost:5000  will just say ---   Cannot GET /                    //because we do not have any endpoint
                                          //so what do is add an end point or add a route




//define our rouutes         //this is just bringing our routes in server.js
app.use('/api/users' , require('./routes/users'));                          //every backend route to start with  /api   and then it will look into the forlder then write the url in ythe require folder
app.use('/api/auth' , require('./routes/auth')); 
app.use('/api/contacts' , require('./routes/contacts')); 







const PORT = process.env.PORT || 5000;             // this will look for an environmental variable called port ,, and we did not write 5000 here straight away because it will be used in production

app.listen(PORT, () => console.log(`BACKEND Server started on port ${PORT}`));                        //this is to connect one end     //so to connect we ppass in the port and a callback function so that we want anything else to happen





//so lets break all routes in different files    --  different routes 3 of them
//contacts diff routes
//users 
// auth


//to add user functunality for adding persons in dataase
//WE NEED TO HAVE A MODEL FOR EACH RESOURCE    -- SO WE WILL HAVE A CONTACT MODEL AND USER MODEL   {IN MONGODB }