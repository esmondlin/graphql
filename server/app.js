const express = require('express')
const graphqHTTP = require('express-graphql')  //function to connect graphql 
var schema = require('./schema'); //get schema defintion

const app = express()



 app.use('/', graphqHTTP({  // run browser at url /
     schema:schema, //defined schema definition
     graphiql:true, //run graphql on default 
 }));






app.listen(4000,()=>{ // listen and run server at port 4000
    console.log('now listening for request on port 4000');
});



 
