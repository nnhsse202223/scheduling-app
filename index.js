const {script} = require("./Database.js");
const express = require('express');
var app = express();

app.use(express.static('Client'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/Client/StylizedWebsite.html");
});

app.get('/database',(req,res)=>{
    console.log("start");
    let theObj = script();
    console.log("mid");
    res.send(theObj);
    console.log("end");
})

app.listen(8080,()=>{
    console.log('listening on http://localhost:8080')
})