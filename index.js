const {script} = require("./Database.js");
const express = require('express');
let fs = require('fs');
var app = express();

app.use(express.static('Client'));
app.use(express.json());  
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
    let data = req.body.data;
    let valid = 0;
    //check file here

    let csvArray = data.split(/\r?\n|\r|\n/g);
    for(let i = 0; i < csvArray.length; i++)
    {
        let subArray = csvArray[i].split(",");
        if(i == 1)
        {
            for(let j = 1; j < subArray.length; j++)
            {
                if(subArray[j] == "")
                {
                    valid = i;
                }
                else
                {
                    let rooms = subArray[j].split(" | ");
                    for(let k = 0; k < rooms.length; k++)
                    {
                        if(!(typeof +rooms[k] === "number" && !isNaN(+rooms[k])) && rooms[k] != "CEN")
                        {
                            valid = i;
                        }
                    }
                }
            }
        }
        if(i == 3)
        {
            for(let j = 1; j < subArray.length; j++)
            {
                if(subArray[j] == "")
                {
                    valid = i;
                }
                else if(!(typeof +subArray[j] === "number" && !isNaN(+subArray[j])))
                {
                    valid = i;
                }
                else if(+subArray[j] < 1 || +subArray[j] > 8)
                {
                    valid = i;
                }
            }
        }
        if(i == 4)
        {
            for(let j = 1; j < subArray.length; j++)
            {
                if(subArray[j] == "")
                {
                    valid = i;
                }
                else
                {
                    let semesters = subArray[j].split(" | ");
                    for(let k = 0; k < semesters.length; k++)
                    {
                        if(!(typeof +semesters[k] === "number" && !isNaN(+semesters[k])))
                        {
                            valid = i;
                        }
                        else if(+semesters[k] != 1 && +semesters[k] != 2)
                        {
                            valid = i;
                        }
                    }
                }
            }
        }
        if(i == 5)
        {
            for(let j = 1; j < subArray.length; j++)
            {
                if(subArray[j] == "")
                {
                    valid = i;
                }
                else
                {
                    let periods = subArray[j].split(" | ");
                    for(let k = 0; k < periods.length; k++)
                    {
                        if(!(typeof +periods[k] === "number" && !isNaN(+periods[k])))
                        {
                            valid = i;
                        }
                        else if(+periods[k] < 1 || +periods[k] > 8)
                        {
                            valid = i;
                        }
                    }
                }
            }
        }
        if(i == 7)
        {
            for(let j = 1; j < subArray.length; j++)
            {
                if(subArray[j] == "")
                {
                    valid = i;
                }
            }
        }
        if(i >= 8)
        {
            for(let j = 0; j < subArray.length; j++)
            {
                if(j == 0)
                {
                    if(subArray[j] == "")
                    {
                        valid = i;
                    }
                }
                else if(subArray[j] != "")
                {
                    if(!(typeof +subArray[j] === "number" && !isNaN(subArray[j])))
                    {
                        valid = i;
                    }
                    else if(+subArray[j] > 10 || +subArray[j] < 1)
                    {
                        valid = i;
                    }
                }
            }
        }
    }
    if(valid == 0)
    {
        fs.writeFileSync("TeacherData.csv",data,(err) => err && console.error(err));
    }
    res.send(valid + "");
});

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