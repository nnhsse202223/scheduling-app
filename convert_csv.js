let csvToJson = require('convert-csv-to-json');
let fs = require('fs');


// let json = csvToJson.parseSubArray(',',',').getJsonFromCsv('CustomClassData.csv');
let fileOutputName = 'data.json';
let fileInputName = 'CustomClassData.csv'

let json = csvToJson.parseSubArray('*','|').getJsonFromCsv(fileInputName);
for(let i=0; i<json.length;i++){
   console.log(json[i]);
}


//json = JSON.stringify(json);
//fs.writeFile("data.json",json,(err) => err && console.error(err));



//need to add teacher subarrays, class types facs, tech


