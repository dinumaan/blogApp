const express = require('express'); // import express into our application
const app = express(); // creating an application instance 
const appConfig = require('./config/appConfig');
const mongoose= require('mongoose');
const fs  = require('fs');


app.use(express.urlencoded({extended: true})); // this is middleware

// Bootstrap route - creating routes
const routesPath = './routes';
fs.readdirSync(routesPath).forEach(function(file){
  const route = require(routesPath + '/' + file);
  route.setRouter(app);
});
// end of Bootstrap route

// Bootstrap models
const modelsPath = './models'
fs.readdirSync(modelsPath).forEach( (file) => {
  if(~file.indexOf('.js')){
    require(modelsPath + '/' + file)
  }
})
// end of Bootstrap models

app.get('/', (req, res) => {
  res.send("Hii your server is running without any error");
});


// listening the server - creating server
app.listen(appConfig.port, () => {
  console.log(`Example app listening at http://localhost:${appConfig.port}`);

  // creating the mongo db connection here
  let db = mongoose.connect(appConfig.db.uri);
})

// handling mongoose connection error
mongoose.connection.on('error', (err) => {
  console.log('database connection error !')
  console.log(err)
})
// end of mongoose connection error handler

// handling mongoose success event
mongoose.connection.on('open', (err) => {
  if(err){
    console.log('database error!')
    console.log(err)
  }else{
    console.log("database connection open success")
  }
})
//end of mongoose connection open handler