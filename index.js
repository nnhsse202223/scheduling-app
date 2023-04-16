const {script} = require("./Database.js");
const express = require('express');
const fileUpload = require('express-fileupload');
let fs = require('fs');
var app = express();

app.use(fileUpload());   
app.use(express.urlencoded({extended: true}));

app.post("/logsDownload", (req,res) => {
   let scheduleNumber = req.body.scheduleNumber;
   let fileNames = fs.readdirSync(__dirname + "/ScheduleLogs");
   if(fileNames.length <= scheduleNumber) {
    scheduleNumber = fileNames.length - 1;
   }
   res.download(__dirname + "/ScheduleLogs/" + fileNames[scheduleNumber], fileNames[scheduleNumber], (err) => err && console.error(err));
});

app.post("/uploadFile", (req,res) => {
    let data = req.files.file;
    data.mv(__dirname + "/TeacherData.csv", (err) => err && console.error(err));
    res.end();
});

app.get("/check", (req,res) => {
    //check if the spreadsheet is valid
    let valid = true;
    //if false, reinstate the previous spreadsheet
    res.send(valid);
})

app.use(express.static('Client'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/Client/StylizedWebsite.html");
});

app.get("/logs", (req,res)=>{
    res.sendFile(__dirname + "/Client/LogViewer.html");
});

app.get("/upload", (req,res)=>{
    res.sendFile(__dirname + "/Client/UploadData.html");
});

app.get("/download", (req,res)=>{
    let fileNames = fs.readdirSync(__dirname + "/ScheduleLogs");
    res.download(__dirname + "/ScheduleLogs/" + fileNames[fileNames.length - 1], fileNames[fileNames.length - 1], (err) => err && console.error(err));
})

app.get('/database', (req,res)=>{
    let csvString = script();
    let fileNames = fs.readdirSync(__dirname + "/ScheduleLogs");
    if(fileNames.length >= 11)
    {
        fs.unlinkSync("ScheduleLogs/" + fileNames[1], (err) => err && console.error(err));
    }
    var today = new Date();
    var dateTime = "Schedule_" + today.getFullYear();
    if(today.getMonth() + 1 < 10)
    {
        dateTime += 0;
    }
    dateTime += today.getMonth() + 1;
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
    res.end();
})

app.listen(8080,()=>{
    console.log('listening on http://localhost:8080')
})