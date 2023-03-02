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
    if(fileNames.length >= 10)
    {
        console.log('what');
        var fileToDelete = fileNames[0];
        fileNames.forEach(name => {
            var check = +name.substring(11, name.indexOf('_')) < +fileToDelete.substring(11, fileToDelete.indexOf('_'));
            var check2 = +name.substring(11, name.indexOf('_')) == +fileToDelete.substring(11, fileToDelete.indexOf('_'));
            if(check)
            {
                fileToDelete = name;
            }
            else if(check2)
            {
                var check3 = +name.substring(name.indexOf('_') + 1, name.indexOf('.')) < +fileToDelete.substring(fileToDelete.indexOf('_') + 1, fileToDelete.indexOf('.'));
                if(check3)
                {
                    fileToDelete = name;
                }
            }
        })
        fs.unlinkSync("Logs/" + fileToDelete, (err) => err && console.error(err));
    }
    var today = new Date();
    var dateTime = "ScheduleLog" + today.getFullYear();
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
    fs.writeFileSync("Logs/" + dateTime + ".csv",csvString,(err) => err && console.error(err));
    res.send(csvString);
})

app.listen(8080,()=>{
    console.log('listening on http://localhost:8080')
})