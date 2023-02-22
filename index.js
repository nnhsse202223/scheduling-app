const {script} = require("./Database.js");
const express = require('express');
var app = express();

app.use(express.static('Client'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/Client/StylizedWebsite.html");
});

app.get('/database', async (req,res)=>{
    let theObj = await script();
    res.send(theObj);
})

app.listen(8080,()=>{
    console.log('listening on http://localhost:8080')
})