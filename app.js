const express = require('express');
var app = express();

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"StylizedWebsite.html")
});

app.get('/database',(req,res)=>{
    //run database code
    res.send()
})
app.use('js',express.static('js'));
app.listen(8080,()=>{
    console.log('listening on 8080')
})