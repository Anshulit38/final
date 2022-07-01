const express = require('express');
const bodyParser = require('body-parser')
const dbConnect = require('./src/config/db')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT||'3320';

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

dbConnect();

let routes  = require('./src/routes/index')
routes(app)

app.use((req,res,next)=>{
    res.status(404).send({errMsg:"Page Not Found"});
})

app.listen(PORT, function(){
    console.log(`Server started at ${PORT}`)
}) 

module.exports = app;
