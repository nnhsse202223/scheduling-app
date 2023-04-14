const {script} = require("./Database.js");
const express = require('express');
let fs = require('fs');
var app = express();

app.use(express.json());       
app.use(express.urlencoded({extended: true}));
app.post("/logs", (req, res) => {
   let scheduleNumber = req.body.scheduleNumber - 1;
   let fileNames = fs.readdirSync(__dirname + "/ScheduleLogs");
   res.download(__dirname + "/ScheduleLogs/" + fileNames[scheduleNumber], fileNames[scheduleNumber], (err) => err && console.error(err));
});

app.use(express.static('Client'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/Client/StylizedWebsite.html");
});

app.get("/logs", (req,res)=>{
    res.sendFile(__dirname + "/Client/LogViewer.html");
});

app.get('/database', (req,res)=>{
    let csvString = script();
    let fileNames = fs.readdirSync(__dirname + "/ScheduleLogs");
    if(fileNames.length >= 10)
    {
        fs.unlinkSync("ScheduleLogs/" + fileNames[0], (err) => err && console.error(err));
    }
    var today = new Date();
    var dateTime = "ScheduleLog_" + today.getFullYear();
    if(today.getMonth() + 1 < 10)
    {
        dateTime += 0;
    }
    dateTime += today.getMonth()+1;
    if(today.getDate() < 10)
    {
        dateTime += 0;
    }
    dateTime += today.getDate() + "_";
    if(today.getHours() < 10)
    {
        dateTime += 0;
    }
    dateTime += today.getHours();
    if(today.getMinutes() < 10)
    {
        dateTime += 0;
    }
    dateTime += today.getMinutes();
    if(today.getSeconds() < 10)
    {
        dateTime += 0;
    }
    dateTime += today.getSeconds();
    fs.writeFileSync("ScheduleLogs/" + dateTime + ".csv",csvString,(err) => err && console.error(err));
    res.send(csvString);
})

app.listen(8080,()=>{
    console.log('listening on http://localhost:8080')
})