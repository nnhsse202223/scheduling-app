const {script} = require("./Database.js");
const express = require('express');
let fs = require('fs');
var app = express();

app.use(express.static('Client'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/Client/StylizedWebsite.html");
});

app.get('/database', async (req,res)=>{
    let csvString = await script();
    fileNames = fs.readdirSync(__dirname + "/Logs");
    console.log(fileNames);
    let n = 0;
    fileNames.forEach(name => {
        name = name.subString(11);
        name
    })
    fs.writeFileSync("Logs/ScheduleLog1.csv",csvString,(err) => err && console.error(err));
    res.send(csvString);
})

app.listen(8080,()=>{
    console.log('listening on http://localhost:8080')
})