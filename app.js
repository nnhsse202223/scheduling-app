const express = require('express');
var app = express();

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(8080,()=>{
    console.log('listening on 8080')
})